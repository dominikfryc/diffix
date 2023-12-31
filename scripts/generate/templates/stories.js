const storiesTemplate =
  component => `import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ${component.name} } from './${component.tag}';

type Component = ${component.name} & {
  slot: string;
};

const meta: Meta<Component> = {
  title: 'Components/${component.name}',
  component: 'dfx-${component.tag}',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<Component>;

const ${component.name}Template = (args: Partial<Component>): TemplateResult =>
  html\`<dfx-${component.tag} property=\${args.property ?? nothing}>
    \${unsafeHTML(args.slot)}
  </dfx-${component.tag}>\`;

export const Default: Story = {
  render: args => ${component.name}Template(args),
};\n`;
export { storiesTemplate };
