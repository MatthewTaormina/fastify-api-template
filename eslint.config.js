import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      // Enforce bracket notation for env vars (noPropertyAccessFromIndexSignature-compatible)
      '@typescript-eslint/no-non-null-assertion': 'warn',
    },
  },
  {
    // Exclude compiled output and test fixtures from linting
    ignores: ['dist/**', 'node_modules/**'],
  },
);
