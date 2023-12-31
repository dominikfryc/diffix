import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit';
import { Textarea } from './textarea';

type Component = Textarea & {
  'helper-text': string;
  'hide-label': boolean;
  'character-counter': boolean;
};

const meta: Meta<Component> = {
  title: 'Components/Textarea',
  component: 'dfx-textarea',
  tags: ['autodocs'],
  argTypes: {
    helperText: {
      table: { disable: true },
    },
    hideLabel: {
      table: { disable: true },
    },
    characterCounter: {
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<Component>;

const TextareaTemplate = (args: Partial<Component>): TemplateResult =>
  html`<dfx-textarea
    name=${args.name ?? nothing}
    value=${args.value ?? nothing}
    label=${args.label ?? nothing}
    rows=${args.rows ?? nothing}
    placeholder=${args.placeholder ?? nothing}
    ?required=${args.required}
    minlength=${args.minlength ?? nothing}
    maxlength=${args.maxlength ?? nothing}
    ?disabled=${args.disabled}
    ?readonly=${args.readonly}
    helper-text=${args['helper-text'] ?? nothing}
    ?hide-label=${args['hide-label']}
    ?character-counter=${args['character-counter']}
  ></dfx-textarea>`;

export const Default: Story = {
  args: {
    label: 'Label',
  },
  render: args => TextareaTemplate(args),
};

/**
 * Height of the textarea can be set by `rows` attribute or `--dfx-textarea-height` CSS variable.
 */
export const Rows: Story = {
  args: {
    label: 'Label',
    rows: 5,
  },
  render: args => TextareaTemplate(args),
};

/**
 * Textarea can show a placeholder.
 */
export const Placeholder: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
  render: args => TextareaTemplate(args),
};

/**
 * Textarea can be disabled.
 */
export const Disabled: Story = {
  args: {
    label: 'Label',
    value: 'Value',
    disabled: true,
  },
  render: args => TextareaTemplate(args),
};

/**
 * Textarea can be readonly. Value can be copied, but not edited.
 */
export const ReadOnly: Story = {
  args: {
    label: 'Label',
    value: 'Value',
    readonly: true,
  },
  render: args => TextareaTemplate(args),
};

/**
 * Textarea can show a helper text containing additional information. It disappears when there is an error.
 */
export const HelperText: Story = {
  args: {
    label: 'Label',
    'helper-text': 'Helper text',
  },
  render: args => TextareaTemplate(args),
};

/**
 * Textarea can hide its label. Label is set to the input element as `aria-label`.
 */
export const HideLabel: Story = {
  args: {
    label: 'Label',
    'hide-label': true,
  },
  render: args => TextareaTemplate(args),
};

/**
 * Textarea can display a character counter. If `maxlength` is set, it is displayed in the counter.
 */
export const CharacterCounter: Story = {
  args: {
    label: 'Label',
    'character-counter': true,
  },
  render: args =>
    html`${TextareaTemplate({ ...args, label: 'Character counter' })}
    ${TextareaTemplate({ ...args, label: 'With maxlength', maxlength: 100 })}`,
};

/**
 * Textarea can have these validation rules:
 * - `required`: Textarea must have a value.
 * - `minlength`: Value must be at least this long.
 * - `maxlength`: Value must be at most this long.
 */
export const Validation: Story = {
  args: {
    label: 'Label',
    required: true,
    minlength: 10,
    maxlength: 100,
    'character-counter': true,
    'helper-text': 'Must be between 10 and 100 characters long.',
  },
  render: args => TextareaTemplate(args),
};
