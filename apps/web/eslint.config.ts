import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.ts';

export default [
  ...baseConfig,
  ...nx.configs['flat/react'],
  {
    files: ['**/*.ts'],
    // Override or add rules here
    rules: {},
  },
];
