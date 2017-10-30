import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import PropTypes from 'prop-types';

class Menu extends React.Component {
  static propTypes = {
    button: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    style: View.propTypes.style,
  };

  state = {
    modalOpen: false,
    animationStarted: false,

    top: 0,
    left: 0,

    menuWidth: 0,
    menuHeight: 0,

    buttonWidth: 0,
    buttonHeight: 0,

    menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
    opacityAnimation: new Animated.Value(0),
  };

  _animationDuration = 300;
  _container = null;
  _easing = Easing.bezier(0.4, 0, 0.2, 1);

  // Start menu animation
  _onMenulLayout = e => {
    if (this.state.animationStarted) {
      return;
    }

    const { width, height } = e.nativeEvent.layout;

    this.setState(
      {
        animationStarted: true,
        menuWidth: width,
        menuHeight: height,
      },
      () => {
        Animated.parallel([
          Animated.timing(this.state.menuSizeAnimation, {
            toValue: { x: width, y: height },
            duration: this._animationDuration,
            easing: this._easing,
          }),
          Animated.timing(this.state.opacityAnimation, {
            toValue: 1,
            duration: this._animationDuration,
            easing: this._easing,
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

  _setContainerRef = ref => {
    this._container = ref;
  };

  show = () => {
    this._container.measureInWindow((x, y) => {
      this.setState({ modalOpen: true, top: y, left: x });
    });
  };

  hide = () => {
    Animated.timing(this.state.opacityAnimation, {
      toValue: 0,
      duration: this._animationDuration,
      easing: this._easing,
    }).start(() =>
      // Reset state
      this.setState({
        modalOpen: false,
        animationStarted: false,
        menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
        opacityAnimation: new Animated.Value(0),
      }),
    );
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

    // If menu hits right
    if (left > dimensions.width - this.state.menuWidth) {
      transforms.push({
        translateX: Animated.multiply(menuSizeAnimation.x, -1),
      });

      left += this.state.buttonWidth;
    }

    // If menu hits bottom
    if (top > dimensions.height - this.state.menuHeight) {
      transforms.push({
        translateY: Animated.multiply(menuSizeAnimation.y, -1),
      });

      top += this.state.buttonHeight;
    }

    const shadowMenuContainerStyle = {
      opacity: this.state.opacityAnimation,
      transform: transforms,
      left,
      top,
    };

    return (
      <View ref={this._setContainerRef}>
        <View onLayout={this._onButtonLayout}>{this.props.button}</View>

        <Modal visible={this.state.modalOpen} transparent>
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
                  style={[
                    styles.menuContainer,
                    this.state.animationStarted && menuSize,
                  ]}
                >
                  {this.props.children}
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
    borderRadius: 2,
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
        elevation: 2,
      },
    }),
  },

  menuContainer: {
    overflow: 'hidden',
  },
});

export default Menu;
