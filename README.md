# react-native-material-menu

React native component implementing [menu](https://material.io/guidelines/components/menus.html) from material design.

<img src="https://media.giphy.com/media/3o7aD5aOoEQ8Wy10FW/giphy.gif" />

## Install

```
npm install --save react-native-material-menu

or

yarn add react-native-material-menu
```


## Usage

```javascript
import Menu, { ListItem } from 'react-native-material-menu';

class TestMenu extends React.Component {
  setMenuRef = ref => {
    this.menu = ref;
  };

  menu = null;

  hideMenu = () => {
    this.menu.hideMenu();
  };

  render() {
    return (
      <Menu ref={this.setMenuRef} button={<Text>Hello</Text>}>
        <ListItem onPress={this.hideMenu}>Test 1</ListItem>
        <ListItem onPress={this.hideMenu}>Test 2</ListItem>
        <ListItem onPress={this.hideMenu} disabled>
          Test 3
        </ListItem>
        <ListItem onPress={this.hideMenu}>Test 4</ListItem>
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
 menuStyle         | Menu style                                    |   Style  | -


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
 disabled          | Disabled flag                        |   Bool     | False
 disabledTextColor | Disabled text color                  |   String   | "rgb(224,224,224)"
 onPress           | Called function on press             |   Func     | -
 style             | Container style                      |   Style    | -
 textStyle         | Text style                           |   Style    | -
