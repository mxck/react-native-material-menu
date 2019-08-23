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

import { View, Text } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

class App extends React.PureComponent {
  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu}>Show menu</Text>}
        >
          <MenuItem onPress={this.hideMenu}>Menu item 1</MenuItem>
          <MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>
          <MenuItem onPress={this.hideMenu} disabled>
            Menu item 3
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem>
        </Menu>
      </View>
    );
  }
}

export default App;
```

## Menu

### Properties

| name              | description                            |     type | default |
| :---------------- | :------------------------------------- | -------: | :------ |
| children          | Components rendered in menu (required) |     Node | -       |
| button            | Button component (required)            |     Node | -       |
| style             | Menu style                             |    Style | -       |
| onHidden          | Callback when menu has become hidden   | Function | -       |
| animationDuration | Changes show() and hide() duration     |   Number | 300     |

### Methods

| name   | description |
| :----- | :---------- |
| show() | Shows menu  |
| hide() | Hides menu  |

## MenuItem

### Properties

| name              | description                  |   type | default                          |
| :---------------- | :--------------------------- | -----: | :------------------------------- |
| children          | Rendered children (required) |   Node | -                                |
| disabled          | Disabled flag                |   Bool | `false`                          |
| disabledTextColor | Disabled text color          | String | `'#bdbdbd'`                      |
| ellipsizeMode     | Custom ellipsizeMode         | String | iOS: `'clip'`, Android: `'tail'` |
| onPress           | Called function on press     |   Func | -                                |
| style             | Container style              |  Style | -                                |
| textStyle         | Text style                   |  Style | -                                |
| underlayColor     | Pressed color                | String | `'#e0e0e0'`                      |

> **Children** must be based on [`<Text>`][text component] component (like **text** itself, strings, [react-native-vector-icons] or [expo icons]) otherwise you may get an error on a real device.

## MenuDivider

### Properties

| name  | description |   type | default              |
| :---- | :---------- | -----: | :------------------- |
| color | Line color  | String | `'rgba(0,0,0,0.12)'` |

## Pietile native kit

Also take a look at other our components for react-native - [pietile-native-kit](https://github.com/pietile/pietile-native-kit)

## License

MIT License. © Maksim Milyutin 2017-2019

[text component]: https://facebook.github.io/react-native/docs/text.html
[react-native-vector-icons]: https://github.com/oblador/react-native-vector-icons
[expo icons]: https://docs.expo.io/versions/latest/guides/icons/
