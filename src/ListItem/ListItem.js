import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

import PropTypes from 'prop-types';

const ListItem = ({
  children,
  disabled,
  disabledTextColor = 'rgb(189,189,189)',
  onPress,
  style,
  textStyle,
}) => (
  <TouchableHighlight
    disabled={disabled}
    onPress={onPress}
    style={[styles.container, style]}
    underlayColor="rgb(224,224,224)"
  >
    <Text
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

ListItem.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  disabledTextColor: PropTypes.string,
  onPress: PropTypes.func,
  style: TouchableHighlight.propTypes.style,
  textStyle: Text.propTypes.style,
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    maxWidth: 248,
    minWidth: 124,
  },

  title: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 48,
    paddingHorizontal: 16,
  },

  disabled: {},
});

export default ListItem;
