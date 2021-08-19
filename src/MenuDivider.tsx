import React from 'react';

import { StyleSheet, View } from 'react-native';

export interface MenuDividerProps {
  color?: string;
}

export function MenuDivider({ color = 'rgba(0,0,0,0.12)' }: MenuDividerProps) {
  return <View style={[styles.divider, { borderBottomColor: color }]} />;
}

const styles = StyleSheet.create({
  divider: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
