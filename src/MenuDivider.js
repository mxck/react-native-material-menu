import React from 'react';
import { View, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

function MenuDivider({ color }) {
  return <View style={[styles.divider, { borderBottomColor: color }]} />;
}

MenuDivider.defaultProps = {
  color: 'rgba(0,0,0,0.12)',
};

MenuDivider.propTypes = {
  color: PropTypes.string,
};

const styles = StyleSheet.create({
  divider: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default MenuDivider;
