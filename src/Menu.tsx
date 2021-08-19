import React from 'react';

import {
  Animated,
  Dimensions,
  Easing,
  I18nManager,
  LayoutChangeEvent,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

export interface MenuProps {
  children?: React.ReactNode;
  button?: React.ReactNode;
  style?: ViewStyle;
  onHidden?(): void;
  animationDuration?: number;
  testID?: string;
  open?: boolean;
}

enum States {
  Hidden,
  Animating,
  Shown,
}

interface State {
  buttonHeight: number;
  buttonWidth: number;
  left: number;
  menuHeight: number;
  menuSizeAnimation: Animated.ValueXY;
  menuState: States;
  menuWidth: number;
  opacityAnimation: Animated.Value;
  top: number;
}

const EASING = Easing.bezier(0.4, 0, 0.2, 1);
const SCREEN_INDENT = 8;

export class Menu extends React.Component<MenuProps, State> {
  _container: View | null = null;

  static defaultProps = {
    animationDuration: 21,
  };

  constructor(props: MenuProps) {
    super(props);

    this.state = {
      menuState: States.Hidden,

      top: 0,
      left: 0,

      menuWidth: 0,
      menuHeight: 0,

      buttonWidth: 0,
      buttonHeight: 0,

      menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
      opacityAnimation: new Animated.Value(0),
    };
  }

  componentDidMount() {
    if (!this.props.open) {
      return;
    }

    this.show();
  }

  componentDidUpdate(prevProps: MenuProps) {
    if (prevProps === this.props.open) {
      return;
    }

    if (this.props.open) {
      this.show();
    } else {
      this.hide();
    }
  }

  _setContainerRef = (ref: View) => {
    this._container = ref;
  };

  // Start menu animation
  _onMenuLayout = (e: LayoutChangeEvent) => {
    if (this.state.menuState === States.Animating) {
      return;
    }

    const { width, height } = e.nativeEvent.layout;

    this.setState(
      {
        menuState: States.Animating,
        menuWidth: width,
        menuHeight: height,
      },
      () => {
        Animated.parallel([
          Animated.timing(this.state.menuSizeAnimation, {
            toValue: { x: width, y: height },
            duration: this.props.animationDuration,
            easing: EASING,
            useNativeDriver: false,
          }),
          Animated.timing(this.state.opacityAnimation, {
            toValue: 1,
            duration: this.props.animationDuration,
            easing: EASING,
            useNativeDriver: false,
          }),
        ]).start();
      },
    );
  };

  show = () => {
    this._container?.measureInWindow((left, top, buttonWidth, buttonHeight) => {
      this.setState({
        buttonHeight,
        buttonWidth,
        left,
        menuState: States.Shown,
        top,
      });
    });
  };

  hide = (onHidden?: () => void) => {
    Animated.timing(this.state.opacityAnimation, {
      toValue: 0,
      duration: this.props.animationDuration,
      easing: EASING,
      useNativeDriver: false,
    }).start(() => {
      // Reset state
      this.setState(
        {
          menuState: States.Hidden,
          menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
          opacityAnimation: new Animated.Value(0),
        },
        () => {
          if (onHidden) {
            onHidden();
          }

          // Invoke onHidden callback if defined
          if (this.props.onHidden) {
            this.props.onHidden();
          }
        },
      );
    });
  };

  // @@ TODO: Rework this
  _hide = () => {
    this.hide();
  };

  render() {
    const { isRTL } = I18nManager;

    const dimensions = Dimensions.get('window');
    const { width: windowWidth } = dimensions;
    const windowHeight = dimensions.height - (StatusBar.currentHeight || 0);

    const {
      menuSizeAnimation,
      menuWidth,
      menuHeight,
      buttonWidth,
      buttonHeight,
      opacityAnimation,
    } = this.state;
    const menuSize = {
      width: menuSizeAnimation.x,
      height: menuSizeAnimation.y,
    };

    // Adjust position of menu
    let { left, top } = this.state;
    const transforms = [];

    if (
      (isRTL && left + buttonWidth - menuWidth > SCREEN_INDENT) ||
      (!isRTL && left + menuWidth > windowWidth - SCREEN_INDENT)
    ) {
      transforms.push({
        translateX: Animated.multiply(menuSizeAnimation.x, -1),
      });

      left = Math.min(windowWidth - SCREEN_INDENT, left + buttonWidth);
    } else if (left < SCREEN_INDENT) {
      left = SCREEN_INDENT;
    }

    // Flip by Y axis if menu hits bottom screen border
    if (top > windowHeight - menuHeight - SCREEN_INDENT) {
      transforms.push({
        translateY: Animated.multiply(menuSizeAnimation.y, -1),
      });

      top = windowHeight - SCREEN_INDENT;
      top = Math.min(windowHeight - SCREEN_INDENT, top + buttonHeight);
    } else if (top < SCREEN_INDENT) {
      top = SCREEN_INDENT;
    }

    const shadowMenuContainerStyle = {
      opacity: opacityAnimation,
      transform: transforms,
      top,

      // Switch left to right for rtl devices
      ...(isRTL ? { right: left } : { left }),
    };

    const { menuState } = this.state;
    const animationStarted = menuState === States.Animating;
    const modalVisible = menuState === States.Shown || animationStarted;

    const { testID, button, style, children } = this.props;

    return (
      <View ref={this._setContainerRef} collapsable={false} testID={testID}>
        <View>{button}</View>

        <Modal
          visible={modalVisible}
          onRequestClose={this._hide}
          supportedOrientations={[
            'portrait',
            'portrait-upside-down',
            'landscape',
            'landscape-left',
            'landscape-right',
          ]}
          transparent
        >
          <TouchableWithoutFeedback onPress={this._hide} accessible={false}>
            <View style={StyleSheet.absoluteFill}>
              <Animated.View
                onLayout={this._onMenuLayout}
                style={[styles.shadowMenuContainer, shadowMenuContainerStyle, style]}
              >
                <Animated.View style={[styles.menuContainer, animationStarted && menuSize]}>
                  {children}
                </Animated.View>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shadowMenuContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 4,
    opacity: 0,

    // Shadow
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.14,
        shadowRadius: 2,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  menuContainer: {
    overflow: 'hidden',
  },
});
