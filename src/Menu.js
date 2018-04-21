import React from 'react';

import PropTypes from 'prop-types';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes,
} from 'react-native';

import WidthContext from './WidthContext';

const STATES = {
  HIDDEN: 'HIDDEN',
  ANIMATING: 'ANIMATING',
  SHOWN: 'SHOWN',
};

const ANIMATION_DURATION = 300;
const EASING = Easing.bezier(0.4, 0, 0.2, 1);
const MENU_PADDING_VERTICAL = 8;
const SCREEN_INDENT = 8;

class Menu extends React.Component {
  state = {
    menuState: STATES.HIDDEN,

    top: 0,
    left: 0,

    menuWidth: 0,
    menuHeight: 0,

    buttonWidth: 0,
    buttonHeight: 0,

    menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
    opacityAnimation: new Animated.Value(0),
  };

  _container = null;

  _setCointainerRef = ref => {
    this._container = ref;
  };

  // Start menu animation
  _onMenulLayout = e => {
    if (this.state.menuState === STATES.ANIMATING) {
      return;
    }

    const { width, height } = e.nativeEvent.layout;
    const menuHeightWithPadding = height - MENU_PADDING_VERTICAL * 2;

    this.setState(
      {
        menuState: STATES.ANIMATING,
        menuWidth: width,
        menuHeight: height,
      },
      () => {
        Animated.parallel([
          Animated.timing(this.state.menuSizeAnimation, {
            toValue: { x: width, y: menuHeightWithPadding },
            duration: ANIMATION_DURATION,
            easing: EASING,
          }),
          Animated.timing(this.state.opacityAnimation, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            easing: EASING,
          }),
        ]).start();
      },
    );
  };

  // Save button width and height for menu layout
  _onButtonLayout = e => {
    const { width, height } = e.nativeEvent.layout;
    this.setState({ buttonWidth: width, buttonHeight: height });
  };

  show = () => {
    this._container.measureInWindow((x, y) => {
      this.setState({ menuState: STATES.SHOWN, top: y, left: x });
    });
  };

  hide = () => {
    Animated.timing(this.state.opacityAnimation, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      easing: EASING,
    }).start(() => {
      // Reset state
      this.setState({
        menuState: STATES.HIDDEN,
        menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
        opacityAnimation: new Animated.Value(0),
      });
      // Invoke onHidden callback if defined
      if (this.props.onHidden) {
        this.props.onHidden();
      }
    });
  };

  render() {
    const dimensions = Dimensions.get('screen');

    const { menuSizeAnimation } = this.state;
    const menuSize = {
      width: menuSizeAnimation.x,
      height: menuSizeAnimation.y,
    };

    // Adjust position of menu
    let { left, top } = this.state;
    const transforms = [];

    // Flip by X axis if menu hits right screen border
    if (left > dimensions.width - this.state.menuWidth - SCREEN_INDENT) {
      transforms.push({
        translateX: Animated.multiply(menuSizeAnimation.x, -1),
      });

      left += this.state.buttonWidth;
    }

    // Flip by Y axis if menu hits bottom screen border
    if (top > dimensions.height - this.state.menuHeight - SCREEN_INDENT) {
      transforms.push({
        translateY: Animated.multiply(menuSizeAnimation.y, -1),
      });

      top += this.state.buttonHeight - MENU_PADDING_VERTICAL * 2;
    }

    const shadowMenuContainerStyle = {
      opacity: this.state.opacityAnimation,
      transform: transforms,
      left,
      top,
    };

    const { menuState } = this.state;
    const animationStarted = menuState === STATES.ANIMATING;
    const modalVisible = menuState === STATES.SHOWN || animationStarted;

    return (
      <View ref={this._setCointainerRef} collapsable={false}>
        <View onLayout={this._onButtonLayout}>{this.props.button}</View>

        <Modal visible={modalVisible} onRequestClose={this.hide} transparent>
          <TouchableWithoutFeedback onPress={this.hide}>
            <View style={StyleSheet.absoluteFill}>
              <Animated.View
                onLayout={this._onMenulLayout}
                style={[
                  styles.shadowMenuContainer,
                  shadowMenuContainerStyle,
                  this.props.style,
                ]}
              >
                <Animated.View
                  style={[styles.menuContainer, animationStarted && menuSize]}
                >
                  <WidthContext.Provider value={this.state.menuWidth}>
                    {this.props.children}
                  </WidthContext.Provider>
                </Animated.View>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

Menu.propTypes = {
  button: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  style: ViewPropTypes.style,
  onHidden: PropTypes.func,
};

const styles = StyleSheet.create({
  shadowMenuContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 2,
    opacity: 0,
    paddingVertical: MENU_PADDING_VERTICAL,

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

export default Menu;
