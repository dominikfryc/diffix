import type { Preview } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../dist/custom-elements.json';
import { html } from 'js-beautify';
import '../src/themes/default.css';
import '../src/themes/dark.css';
import '../src/index';

setCustomElementsManifest(customElements);

const preview: Preview = {
  parameters: {
    docs: {
      source: {
        transform: (input: string) => html(input, { indent_size: 2 }),
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
