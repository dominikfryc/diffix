import { addons } from '@storybook/manager-api';

addons.setConfig({
  showToolbar: false,
  sidebar: {
    filters: {
      patterns: item => !(item.tags ?? []).includes('hidden'),
    },
  },
});
