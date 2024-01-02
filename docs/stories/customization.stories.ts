import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

type Component = object;

const meta: Meta<Component> = {
  title: 'Getting Started',
  tags: ['hidden'],
};

export default meta;
type Story = StoryObj<Component>;

export const DarkTheme: Story = {
  render: () => html`
    <article>
      <dfx-checkbox-group label="Checkbox group" value="1">
        <dfx-checkbox value="1">Option 1</dfx-checkbox>
        <dfx-checkbox value="2">Option 2</dfx-checkbox>
        <dfx-checkbox value="3">Option 3</dfx-checkbox>
      </dfx-checkbox-group>
      <dfx-button theme="primary" variant="filled">Button</dfx-button>
    </article>
    <article data-theme="dark">
      <dfx-checkbox-group label="Checkbox group" value="1">
        <dfx-checkbox value="1">Option 1</dfx-checkbox>
        <dfx-checkbox value="2">Option 2</dfx-checkbox>
        <dfx-checkbox value="3">Option 3</dfx-checkbox>
      </dfx-checkbox-group>
      <dfx-button theme="primary" variant="filled">Button</dfx-button>
    </article>

    <style>
      article {
        background-color: var(--dfx-color-background-surface);
        color: var(--dfx-color-text-dark);
        display: grid;
        gap: var(--dfx-size-m);
        padding: var(--dfx-size-xl);
      }
    </style>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <article data-theme="custom">
      <dfx-checkbox-group label="Checkbox group" value="1">
        <dfx-checkbox value="1">Option 1</dfx-checkbox>
        <dfx-checkbox value="2">Option 2</dfx-checkbox>
        <dfx-checkbox value="3">Option 3</dfx-checkbox>
      </dfx-checkbox-group>
      <dfx-button theme="primary" variant="filled">Button</dfx-button>
    </article>

    <style>
      [data-theme='custom'] {
        --dfx-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
        --dfx-color-primary-dark: #fbbf24;
        --dfx-color-primary-dark-variant: #f59e0b;
        --dfx-color-contrast-text: #09090b;
        --dfx-border-radius-m: 0;
      }
    </style>
  `,
};

export const CSSCustomProperty: Story = {
  render: () => html`
    <style>
      dfx-button.rounded {
        --dfx-button-border-radius: var(--dfx-border-radius-full);
      }
    </style>

    <dfx-button theme="primary" variant="filled" class="rounded">Button</dfx-button>
  `,
};

export const CSSPart: Story = {
  render: () => html`
    <style>
      dfx-button.underline::part(button) {
        text-decoration: underline;
      }
    </style>

    <dfx-button theme="primary" variant="filled" class="underline">Button</dfx-button>
  `,
};
