import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import PropTypes from 'prop-types';

class Menu extends React.Component {
  static propTypes = {
    button: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    menuStyle: View.propTypes.style,
  };

  state = {
    modalOpened: false,
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

  animationDuration = 300;
  easing = Easing.bezier(0.4, 0, 0.2, 1);

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
            duration: this.animationDuration,
            easing: this.easing,
          }),
          Animated.timing(this.state.opacityAnimation, {
            toValue: 1,
            duration: this.animationDuration,
            easing: this.easing,
          }),
        ]).start();
      },
    );
  };

  _onButtonLayout = e => {
    const { width, height } = e.nativeEvent.layout;
    this.setState({ buttonWidth: width, buttonHeight: height });
  };

  show = () => {
    this.container.measureInWindow((x, y) => {
      this.setState({ modalOpened: true, top: y, left: x });
    });
  };

  hide = () => {
    Animated.timing(this.state.opacityAnimation, {
      toValue: 0,
      duration: this.animationDuration,
      easing: this.easing,
    }).start(() =>
      // Reset state
      this.setState({
        modalOpened: false,
        animationStarted: false,
        menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
        opacityAnimation: new Animated.Value(0),
      }),
    );
  };

  _setContainerRef = ref => {
    this.container = ref;
  };

  container = null;

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

    const menuContainerStyle = {
      opacity: this.state.opacityAnimation,
      transform: transforms,
      left,
      top,
    };

    return (
      <View ref={this._setContainerRef}>
        <View onLayout={this._onButtonLayout}>{this.props.button}</View>

        <Modal visible={this.state.modalOpened} transparent>
          <TouchableWithoutFeedback onPress={this.hide}>
            <View style={StyleSheet.absoluteFill}>
              <Animated.View
                onLayout={this._onMenulLayout}
                style={[
                  styles.menuContainer,
                  menuContainerStyle,
                  this.props.menuStyle,
                ]}
              >
                <Animated.View
                  style={[styles.menu, this.state.animationStarted && menuSize]}
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
  menuContainer: {
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

  menu: {
    overflow: 'hidden',
  },
});

export default Menu;
