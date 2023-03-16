import React from 'react';

import {
  Animated,
  Dimensions,
  Easing,
  I18nManager,
  LayoutChangeEvent,
  Modal, StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';

export interface MenuProps {
  children?: React.ReactNode;
  anchor?: React.ReactNode;
  style?: ViewStyle;
  onRequestClose?(): void;
  animationDuration?: number;
  testID?: string;
  visible?: boolean;
  top?: any;
  left?: any;
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
    animationDuration: 300,
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
    if (!this.props.visible) {
      return;
    }

    this.show();
  }

  componentDidUpdate(prevProps: MenuProps) {
    if (prevProps.visible === this.props.visible) {
      return;
    }

    if (this.props.visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  private setContainerRef = (ref: View) => {
    this._container = ref;
  };

  // Start menu animation
  private onMenuLayout = (e: LayoutChangeEvent) => {
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

  private show = () => {
    this._container?.measureInWindow((left, top, buttonWidth, buttonHeight) => {
      this.setState({
        buttonHeight,
        buttonWidth,
        left: this.props.left ? this.props.left : left,
        menuState: States.Shown,
        top: this.props.top ? this.props.top : top,
      });
    });
  };

  private hide = () => {
    // Animated.timing(this.state.opacityAnimation, {
    //   toValue: 0,
    //   duration: this.props.animationDuration,
    //   easing: EASING,
    //   useNativeDriver: false,
    // }).start(() => {
    //   // Reset state
      this.setState({
        menuState: States.Hidden,
        // menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
        // opacityAnimation: new Animated.Value(0),
      });
    // });
  };

  private onRequestClose = () => {
    this.props.onRequestClose?.();
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

    const { testID, anchor, style, children } = this.props;

    return (
      <View ref={this.setContainerRef} collapsable={false} testID={testID}>
        {anchor}

        <Modal
          visible={modalVisible}
          onRequestClose={this.onRequestClose}
          supportedOrientations={[
            'portrait',
            'portrait-upside-down',
            'landscape',
            'landscape-left',
            'landscape-right',
          ]}
          transparent
        >
          <TouchableWithoutFeedback onPress={this.onRequestClose} accessible={false}>
            <View style={StyleSheet.absoluteFill}>
              <Animated.View
                onLayout={this.onMenuLayout}
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
    // backgroundColor: 'white',
    // borderRadius: 4,
    // opacity: 0,

    // // Shadow
    // ...Platform.select({
    //   ios: {
    //     shadowColor: 'black',
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.14,
    //     shadowRadius: 2,
    //   },
    //   android: {
    //     elevation: 8,
    //   },
    // }),
  },
  menuContainer: {
    overflow: 'hidden',
  },
});
