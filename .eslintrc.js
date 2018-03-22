module.exports = {
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': false,
    'no-debugger': 0,
  },
  env: {
    browser: true,
    node: true,
    jasmine: true,
  },
};
