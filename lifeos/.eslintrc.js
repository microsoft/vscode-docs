module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    // Performance-related rules
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    
    // React-specific optimizations
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-no-bind': 'warn',
    'react/jsx-key': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};