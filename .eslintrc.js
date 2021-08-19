module.exports = {
  extends: '@react-native-community',

  rules: {
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'import/no-unresolved': 'off', // peer dependencies

    // React
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
