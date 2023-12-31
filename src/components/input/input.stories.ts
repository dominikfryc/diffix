import type { Meta, StoryObj } from '@storybook/web-components';
import { TemplateResult, html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Input } from './input';

type Component = Input & {
  start: string;
  end: string;
  'helper-text': string;
  'hide-label': boolean;
};

const meta: Meta<Component> = {
  title: 'Components/Input',
  component: 'dfx-input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: [
        'date',
        'datetime-local',
        'email',
        'month',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'time',
        'url',
        'week',
      ],
      control: { type: 'select' },
    },
    inputmode: {
      options: ['none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url'],
      control: { type: 'select' },
    },
    helperText: {
      table: { disable: true },
    },
    hideLabel: {
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<Component>;

const InputTemplate = (args: Partial<Component>): TemplateResult =>
  html`<dfx-input
    name=${args.name ?? nothing}
    type=${args.type ?? nothing}
    label=${args.label ?? nothing}
    placeholder=${args.placeholder ?? nothing}
    value=${args.value ?? nothing}
    ?required=${args.required}
    minlength=${args.minlength ?? nothing}
    maxlength=${args.maxlength ?? nothing}
    min=${args.min ?? nothing}
    max=${args.max ?? nothing}
    step=${args.step ?? nothing}
    pattern=${args.pattern ?? nothing}
    autocomplete=${args.autocomplete ?? nothing}
    ?disabled=${args.disabled}
    ?loading=${args.loading}
    ?readonly=${args.readonly}
    inputmode=${args.inputmode ?? nothing}
    helper-text=${args['helper-text'] ?? nothing}
    ?hide-label=${args['hide-label']}
  >
    ${unsafeHTML(args.start)} ${unsafeHTML(args.end)}
  </dfx-input>`;

export const Default: Story = {
  args: {
    label: 'Label',
  },
  render: args => InputTemplate(args),
};

/**
 * Input has multiple types, each with their own specific behavior:
 * - `date`: Control for entering date.
 * - `datetime-local`: Control for entering date and time.
 * - `email`: Control for editing email address.
 * - `month`: Control for entering month and year.
 * - `number`: Control for entering number. Displays buttons to increase and decrease the value.
 * - `password`: Control for entering password. Displays button to switch password visibility.
 * - `search`: Control for entering search term.
 * - `tel`: Control for entering telephone number.
 * - `text`: Default control for entering text.
 * - `time`: Control for entering time.
 * - `url`: Control for entering URL.
 * - `week`: Control for entering week number.
 */
export const Types: Story = {
  render: args =>
    html`<div style="display: flex; flex-wrap: wrap; gap: 12px">
      ${InputTemplate({ ...args, type: 'date', label: 'Date', value: '2024-01-01' })}
      ${InputTemplate({
        ...args,
        type: 'datetime-local',
        label: 'Date and time',
        value: '2024-01-01T08:00',
      })}
      ${InputTemplate({ ...args, type: 'email', label: 'Email', value: 'john@doe.com' })}
      ${InputTemplate({ ...args, type: 'month', label: 'Month', value: '2024-01' })}
      ${InputTemplate({ ...args, type: 'number', label: 'Number', value: '4' })}
      ${InputTemplate({ ...args, type: 'password', label: 'Password', value: 'password' })}
      ${InputTemplate({ ...args, type: 'search', label: 'Search', value: 'News' })}
      ${InputTemplate({ ...args, type: 'tel', label: 'Tel', value: '+1 785-156-8965' })}
      ${InputTemplate({ ...args, type: 'text', label: 'Text', value: 'Note' })}
      ${InputTemplate({ ...args, type: 'time', label: 'Time', value: '08:00' })}
      ${InputTemplate({ ...args, type: 'url', label: 'URL', value: 'https://www.google.com' })}
      ${InputTemplate({ ...args, type: 'week', label: 'Week', value: '2024-W01' })}
    </div>`,
};

/**
 * Input can show a placeholder.
 */
export const Placeholder: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
  render: args => InputTemplate(args),
};

/**
 * Input can autocomplete the value. For this to work, input needs to be inside a `<form>` element.
 */
export const Autocomplete: Story = {
  args: {
    label: 'Email',
    type: 'email',
    autocomplete: 'email',
  },
  render: args => html`<form>${InputTemplate(args)}</form>`,
};

/**
 * Input can be disabled.
 */
export const Disabled: Story = {
  args: {
    label: 'Label',
    value: 'Value',
    disabled: true,
  },
  render: args => InputTemplate(args),
};

/**
 * Input can be loading. For example when fetching data from a server.
 */
export const Loading: Story = {
  args: {
    label: 'Label',
    value: 'Value',
    loading: true,
  },
  render: args => InputTemplate(args),
};

/**
 * Input can be readonly. Value can be copied, but not edited.
 */
export const ReadOnly: Story = {
  args: {
    label: 'Label',
    value: 'Value',
    readonly: true,
  },
  render: args => InputTemplate(args),
};

/**
 * Input has multiple input modes, each with their own specific behavior:
 * - `none`: No virtual keyboard.
 * - `text`: Standard virtual keyboard.
 * - `decimal`: Fractional numeric virtual keyboard with decimal separator.
 * - `numeric`: Numeric virtual keyboard with numbers 0-9.
 * - `tel`: Telephone virtual keyboard with numbers 0-9, `+`, `*` and `#`.
 * - `search`: Virtual keyboard with search button.
 * - `email`: Virtual keyboard with `@` button.
 * - `url`: Virtual keyboard with `/` and `.com` buttons.
 */
export const InputMode: Story = {
  decorators: [
    story => html`<div style="display: flex; flex-wrap: wrap; gap: 12px">${story()}</div>`,
  ],
  render: args =>
    html`${InputTemplate({ ...args, inputmode: 'none', label: 'None' })}
    ${InputTemplate({ ...args, inputmode: 'text', label: 'Text' })}
    ${InputTemplate({ ...args, inputmode: 'decimal', label: 'Decimal' })}
    ${InputTemplate({ ...args, inputmode: 'numeric', label: 'Numeric' })}
    ${InputTemplate({ ...args, inputmode: 'tel', label: 'Tel' })}
    ${InputTemplate({ ...args, inputmode: 'search', label: 'Search' })}
    ${InputTemplate({ ...args, inputmode: 'email', label: 'Email' })}
    ${InputTemplate({ ...args, inputmode: 'url', label: 'URL' })}`,
};

/**
 * Input can show a helper text containing additional information. It disappears when there is an error.
 */
export const HelperText: Story = {
  args: {
    label: 'Label',
    'helper-text': 'Helper text',
  },
  render: args => InputTemplate(args),
};

/**
 * Input can hide its label. Label is set to the input element as `aria-label`.
 */
export const HideLabel: Story = {
  args: {
    label: 'Label',
    'hide-label': true,
  },
  render: args => InputTemplate(args),
};

/**
 * Input has two optional slots:
 * - `start`: Content before the input.
 * - `end`: Content after the input.
 *
 * Slots have styles for `<svg>` icons, `<dfx-button>` buttons and `<span>` text elements.
 */
export const Slots: Story = {
  args: {
    label: 'Label',
    start: '<span slot="start">$</span>',
    end: '<svg slot="end" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>',
  },
  render: args => InputTemplate(args),
};

/**
 * Input can have these validation rules:
 * - `required`: Input must have a value.
 * - `pattern`: Input value must match this regular expression.
 * - `minlength`: Input value must be at least this long.
 * - `maxlength`: Input value must be at most this long.
 * - `min`: Input value must be at least this value.
 * - `max`: Input value must be at most this value.
 * - `step`: Input value must be a multiple of this value.
 *
 * Inputs with type `email` and `url` have built-in validation rules.
 */
export const Validation: Story = {
  args: {
    label: 'Password',
    name: 'password',
    type: 'password',
    required: true,
    minlength: 8,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$',
    'helper-text':
      'Must be long at least 8 characters, contain at least one lowercase letter, one uppercase letter and one number.',
  },
  render: args =>
    html`<form onsubmit="submitForm(event)" style="display: flex; gap: 8px">
        ${InputTemplate(args)}
        <dfx-button type="reset" style="margin-top: 28px">Reset</dfx-button>
        <dfx-button type="submit" variant="filled" style="margin-top: 28px">Check</dfx-button>
      </form>

      <script>
        var submitForm = event => {
          event.preventDefault();
          if (event.target.checkValidity()) {
            alert('Form is valid');
          }
        };
      </script>`,
};
