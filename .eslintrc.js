module.exports = {
  root: true,
  extends: ['@react-native-community'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    semi: [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'no-shadow': 'off',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-restricted-syntax': [
      'error',
      {
        "selector": "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        "message": "Unexpected property on console object was called"
        // "message": "Unexpected console statement. (no-console)"
      }
    ]
  },

};
