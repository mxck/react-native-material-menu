import React from 'react';

import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableNativeFeedback, TouchableHighlight, Platform } from 'react-native';

function MenuItem({
  children,
  disabled,
  disabledTextColor,
  onPress,
  style,
  textStyle,
  underlayColor,
  ...props
}) {
  const Touchable = Platform.select({
    ios: TouchableHighlight,
    android: TouchableNativeFeedback
  });

  const newProps = Platform.select({
    ios: {
      underlayColor
    },
    android: {
      background: TouchableNativeFeedback.SelectableBackground()
    }
  });

  return (
    <Touchable
      {...props}
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, style]}
      {...newProps}
    >
      {typeof children === 'string' ? (
        <Text
          ellipsizeMode={Platform.OS === 'ios' ? 'clip' : 'tail'}
          numberOfLines={1}
          style={[
            styles.title,
            disabled && { color: disabledTextColor },
            textStyle,
          ]}
        >
          {children}
        </Text>
      ) : (
          <View style={[styles.itemsContainer, style, { width }]}>
            {children}
          </View>
      )}
    </Touchable>
  );
}

MenuItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]).isRequired,
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
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 48,
    maxWidth: 248,
    minWidth: 124,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    paddingHorizontal: 16,
  },
});

export default MenuItem;
