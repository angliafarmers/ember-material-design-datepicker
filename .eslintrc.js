var path = require('path');

module.exports = {
  extends: [
    require.resolve('ember-cli-eslint/coding-standard/ember-application.js')
  ],
  globals: {
    moment: true
  },
  rules: {
    'curly': 2,
    'eqeqeq': 2,
    'no-eval': 2,
    'no-undef': 2,
    'no-unused-vars': 2,
    'camelcase': 2,
    'indent': [2, 2, {
      'SwitchCase': 1,
      'VariableDeclarator': { 'var': 2, 'let': 2, 'const': 3 }
    }],
    'keyword-spacing': 2,
    'no-trailing-spaces': 2,
    'semi': ["error", "always"],
    'space-before-blocks': 2,
    'space-in-parens': 2,
    'space-infix-ops': 2,
    'space-unary-ops': 2,
    'quotes': [2, 'single']
  }
};
