import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfigWithVueTs(
   {
      name: 'app/files-to-lint',
      files: ['**/*.{ts,mts,tsx,vue}'],
   },

   {
      name: 'app/files-to-ignore',
      ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/.vite/**'],
   },

   pluginVue.configs['flat/essential'],
   vueTsConfigs.recommended,
   skipFormatting,
   {
      rules: {
         'vue/multi-word-component-names': 'off',
      },
   },
);
