import js from '@eslint/js';
import globals from 'globals';

export default [
    { ignores: ['dist/', 'node_modules/', 'qa/shots/', 'public/'] },
    js.configs.recommended,
    {
        languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: globals.browser },
        rules: {
            'no-unused-vars': ['warn', { args: 'none', caughtErrors: 'none' }],
        },
    },
    {
        // Node-side tooling; the QA scripts also run code inside the page (page.evaluate), hence browser globals too.
        files: ['qa/**/*.mjs', 'vite.config.js', 'eslint.config.js'],
        languageOptions: { globals: { ...globals.node, ...globals.browser } },
    },
];
