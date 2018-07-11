import React from 'react';

import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

function MenuItem({
  children,
  disabled,
  disabledTextColor,
  onPress,
  style,
  textStyle,
  underlayColor,
  testID
}) {
  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, style]}
      underlayColor={underlayColor}
      testID={testID}
    >
      <Text
        ellipsizeMode="clip"
        numberOfLines={1}
        style={[
          styles.title,
          disabled && { color: disabledTextColor },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </TouchableHighlight>
  );
}

MenuItem.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  disabledTextColor: PropTypes.string,
  onPress: PropTypes.func,
  style: TouchableHighlight.propTypes.style,
  textStyle: Text.propTypes.style,
  underlayColor: TouchableHighlight.propTypes.underlayColor,
};

MenuItem.defaultProps = {
  disabled: false,
  disabledTextColor: '#BDBDBD',
  underlayColor: '#E0E0E0',
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: 'center',
    maxWidth: 248,
    minWidth: 124,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    paddingHorizontal: 16,
  },
});

export default MenuItem;
