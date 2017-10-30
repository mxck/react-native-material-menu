# react-native-material-menu &middot; [![npm](https://img.shields.io/npm/v/react-native-material-menu.svg?style=flat-square)](https://www.npmjs.com/package/react-native-material-menu)

Pure JavaScript [material menu](https://material.io/guidelines/components/menus.html) component for React Native.

<img src="https://media.giphy.com/media/3ov9jUvQH4U82JGNRC/giphy.gif" />

## Install

```bash
npm install --save react-native-material-menu

or

yarn add react-native-material-menu
```


## Usage

```jsx
import Menu, { MenuItem } from 'react-native-material-menu';

class App extends React.Component {
  setMenuRef = ref => {
    this.menu = ref;
  };

  menu = null;

  hideMenu = () => {
    this.menu.hide();
  };

  showMenu = () => {
    this.menu.show();
  };

  render() {
    return (
      <Menu
        ref={this.setMenuRef}
        button={<Text onPress={this.showMenu}>Show menu</Text>}
      >
        <MenuItem onPress={this.hideMenu}>Test 1</MenuItem>
        <MenuItem onPress={this.hideMenu}>Test 2</MenuItem>
        <MenuItem onPress={this.hideMenu} disabled>
          Test 3
        </MenuItem>
        <MenuItem onPress={this.hideMenu}>Test 4</MenuItem>
      </Menu>
    );
  }
}
```


## Menu

### Properties


 name              | description                                   | type     | default
:----------------- |:--------------------------------------------- | --------:|:------------------
 children          | Components rendered in menu (required)        |   Node   | -
 button            | Button component (required)                   |   Node   | -
 style             | Menu style                                    |   Style  | -


### Methods

 name            | description
:--------------- |:------------------------------
 show()      | Shows menu
 hide()      | Hides menu

## ListItem

### Properties

 name              | description                          | type       | default
:----------------- |:------------------------------------ | ----------:|:------------------
 children          | Rendered text (required)             |   String   | -
 disabled          | Disabled flag                        |   Bool     | false
 disabledTextColor | Disabled text color                  |   String   | "rgb(224,224,224)"
 onPress           | Called function on press             |   Func     | -
 style             | Container style                      |   Style    | -
 textStyle         | Text style                           |   Style    | -
 underlayColor     | Pressed color                        |   String   | "rgb(224,224,224)"

## License

MIT License. © Maksim Milyutin 2017
