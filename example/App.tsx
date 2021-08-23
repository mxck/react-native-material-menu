import React, { useState } from 'react';

import { View, Text } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

export default function App() {
  const [visible, setVisible] = useState(false);

  const hide = () => setVisible(false);

  const show = () => setVisible(true);

  return (
    <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Menu visible={visible} anchor={<Text onPress={show}>Show menu</Text>}>
        <MenuItem onPress={hide}>Menu item 1</MenuItem>
        <MenuItem onPress={hide}>Menu item 2</MenuItem>
        <MenuItem onPress={hide} disabled>
          Menu item 3
        </MenuItem>
        <MenuDivider />
        <MenuItem onPress={hide}>Menu item 4</MenuItem>
      </Menu>
    </View>
  );
}
