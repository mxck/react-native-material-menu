import React from 'react';

import { StyleSheet, View } from 'react-native';

function MenuDivider({ color }) {
  return <View style={[styles.divider, { borderBottomColor: color }]} />;
}

MenuDivider.defaultProps = {
  color: 'rgba(0,0,0,0.12)',
};

const styles = StyleSheet.create({
  divider: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default MenuDivider;
