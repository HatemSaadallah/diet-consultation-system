module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-nonoctal-decimal-escape': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'error',
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-throw-literal': 'error',
    'no-useless-concat': 'error',
    'no-useless-escape': 'error',
    'no-void': 'error',
    'no-with': 'error',
    'prefer-promise-reject-errors': 'error',
    'require-await': 'error',
    'no-iterator': 'error',
    'no-invalid-this': 'error',
    'no-global-assign': 'error',
    'no-floating-decimal': 'error',
    'no-extra-bind': 'error',
    'no-extend-native': 'error', // disallow extend from native type
    'no-eval': 'error', // no  eval function
    'no-eq-null': 'error', // disallow null comparisons
    'no-empty-pattern': 'error', // disallow empty destructuring patterns
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'no-else-return': 'error', // disallow else block after return in if
    'no-div-regex': 'warn', //disallow division operators explicitly at the beginning of regular expressions
    'no-constructor-return': 'error', // disallow return in the constructor
    'no-caller': 'error', // Disallow Use of caller/callee becuase deprecated in future
    'max-classes-per-file': 'error', //no more than one class per file
    'guard-for-in': 'error', // require `for-in` loops to include an `if` statement
    eqeqeq: 'error', // use === and !==
    'dot-notation': 'error', // use dot insted of sequare
    'default-param-last': 'error', // default params in the function to be lase
    'default-case-last': 'warn', // default for switch to be last
    'default-case': 'error', // default for switch
    curly: 'warn', // curly for all control statement
    'consistent-return': 'error', // avoid return; in the functions
    complexity: ['error', { max: 10 }], // control the comlexity around the project
    // "class-methods-use-this": "warn", // avoid static classes
    'no-console': 'warn', // no console
    'block-scoped-var': 'error', // use the var inside the scope
    'array-callback-return': 'error', // ensure the return for array callback
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};