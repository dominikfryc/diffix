import type { Preview } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../dist/custom-elements.json';
import { html } from 'js-beautify';
import '../src/themes/default.css';
import '../src/themes/dark.css';
import './assets/styles.css';
import '../src/index.js';

setCustomElementsManifest(customElements);

const preview: Preview = {
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: (input: string) => {
          const text = input
            .replace(/></g, '>\n<')
            .replace(/<([\w-]+)([^>]*)>\s+<\/([\w-]+)([^>]*)>/g, '<$1$2></$3$4>')
            .replace(/=""/g, '')
            .replace(/> </g, '>\n<')
            .replace(/\/([\w-]+)>\s+([^<>]+\S)\s+<\//g, '/$1>\n$2\n</')
            .replace(/<([\w-]+)([^>]*)>\s+([^<>]+\S)\s+<([\w-]+)/g, '<$1$2>\n$3\n<$4')
            .replace(/<([\w-]+)([^>]*)>\s+([^<>]+\S)\s+<\/([\w-]+)>/g, '<$1$2>$3</$4>');
          return html(text, { indent_size: 2 });
        },
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Welcome', 'Getting started', 'Design tokens', 'Customization', 'Contributing'],
        locales: 'en-US',
      },
    },
  },
};

export default preview;
