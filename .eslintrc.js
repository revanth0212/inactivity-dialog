const path = require('path')

module.exports = {
  parser: 'babel-eslint',
  extends: 'eslint-config-airbnb-easy',
  env: {
    browser: true,
    node: true,
    mocha: true,
  },
  plugins: ['react'],
  rules: {
    'linebreak-style': 0,
    'react/jsx-wrap-multilines': ['error', { arrow: true, assignment: true, declaration: true }],
    'no-mixed-operators': [
      'warn',
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: false,
      },
    ],
    'arrow-parens': ['error', 'always'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
        paths: ['node_modules', path.join(__dirname, 'src')],
      },
    },
    flowtype: {
      onlyFilesWithFlowAnnotation: false,
    },
  },
  globals: {
    tinymce: true,
    beforeAll: true,
    afterAll: true,
    context: true,
    SyntheticEvent: true,
    SyntheticAnimationEvent: true,
    SyntheticClipboardEvent: true,
    SyntheticCompositionEvent: true,
    SyntheticInputEvent: true,
    SyntheticUIEvent: true,
    SyntheticFocusEvent: true,
    SyntheticKeyboardEvent: true,
    SyntheticMouseEvent: true,
    SyntheticDragEvent: true,
    SyntheticWheelEvent: true,
    SyntheticTouchEvent: true,
    SyntheticTransitionEvent: true,
  },
}
