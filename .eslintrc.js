module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],

  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],

    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'import/no-unresolved': 'off', // peer dependecies

    // React
    'react/require-default-props': 'off',
    'react/no-typos': 'off',
    'react/destructuring-assignment': 'off',
  },
};
