import React, { useState } from 'react';

import { View, Text } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

export default function App() {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  return (
    <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Menu
        visible={visible}
        anchor={<Text onPress={showMenu}>Show menu</Text>}
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={hideMenu}>Menu item 1</MenuItem>
        <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
        <MenuItem disabled>Disabled item</MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>Menu item 4</MenuItem>
      </Menu>
    </View>
  );
}
