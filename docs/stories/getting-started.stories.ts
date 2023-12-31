import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

type Component = object;

const meta: Meta<Component> = {
  title: 'Getting Started',
  tags: ['hidden'],
};

export default meta;
type Story = StoryObj<Component>;

export const Usage: Story = {
  render: () => html`<dfx-button theme="primary" variant="filled">Button</dfx-button>`,
};

export const Forms: Story = {
  render: () => html`
    <form id="form" style="display: grid; gap: 1rem">
      <dfx-input label="Name" name="name" required></dfx-input>
      <dfx-button type="submit" variant="filled">Submit</dfx-button>
    </form>

    <script>
      document.querySelector('#form').addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        alert(JSON.stringify(Object.fromEntries(formData)));
      });
    </script>
  `,
};
