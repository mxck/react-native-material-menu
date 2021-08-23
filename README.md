# react-native-material-menu &middot; [![npm](https://img.shields.io/npm/v/react-native-material-menu.svg)](https://www.npmjs.com/package/react-native-material-menu) [![license](https://img.shields.io/npm/l/react-native-material-menu.svg)](https://github.com/mxck/react-native-material-menu/blob/master/LICENSE)

Pure JavaScript [material
menu](https://material.io/guidelines/components/menus.html) component for React
Native with automatic RTL support.

<img src="https://media.giphy.com/media/3ov9jUvQH4U82JGNRC/giphy.gif" />

## Install

Using yarn

```sh
yarn add react-native-material-menu
```

or using npm

```sh
npm install --save react-native-material-menu
```

## Usage example ([expo demo](https://snack.expo.io/@mxck/react-native-material-menu-demo))

```jsx
import React from 'react';
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
```

## Menu

| name              | description                            |      type | default |
| :---------------- | :------------------------------------- | --------: | :------ |
| children          | Components rendered in menu (required) | ReactNode | -       |
| anchor            | Button component (required)            | ReactNode | -       |
| visible           | Whether the Menu is currently visible  |   Boolean | -       |
| style             | Menu style                             |     Style | -       |
| onRequestClose    | Callback when menu has become hidden   |  Function | -       |
| animationDuration | Changes show() and hide() duration     |    Number | 300     |

## MenuItem

| name              | description                  |      type | default     |
| :---------------- | :--------------------------- | --------: | :---------- |
| children          | Rendered children (required) | ReactNode | -           |
| disabled          | Disabled flag                |   Boolean | `false`     |
| disabledTextColor | Disabled text color          |    String | `'#bdbdbd'` |
| onPress           | Called function on press     |      Func | -           |
| style             | Container style              |     Style | -           |
| textStyle         | Text style                   |     Style | -           |
| pressColor        | Pressed color                |    String | `'#e0e0e0'` |

> **Children** must be based on [`<Text>`][text component] component (like **text** itself, strings, [react-native-vector-icons] or [expo icons]) otherwise you may get an error on a real device.

## MenuDivider

| name  | description |   type | default              |
| :---- | :---------- | -----: | :------------------- |
| color | Line color  | String | `'rgba(0,0,0,0.12)'` |

## Pietile native kit

Also take a look at other our components for react-native - [pietile-native-kit](https://github.com/pietile/pietile-native-kit)

## License

MIT License. © Maksim Milyutin 2017-2021

[text component]: https://facebook.github.io/react-native/docs/text.html
[react-native-vector-icons]: https://github.com/oblador/react-native-vector-icons
[expo icons]: https://docs.expo.io/versions/latest/guides/icons/
