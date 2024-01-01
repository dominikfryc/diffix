import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import templates
import { globalIndexTemplate, componentIndexTemplate } from './templates/index';
import { styleTemplate } from './templates/styles';
import { componentTemplate } from './templates/component';
import { testTemplate } from './templates/tests';
import { storiesTemplate } from './templates/stories';

// Component type
export type Component = {
  name: string;
  tag: string;
  path: string;
};

// Command line arguments
const args = process.argv.slice(2);

// Check if name is present
if (!args[0]) {
  console.error('Component name must be present');
  process.exit(1);
}

// Check if name has at least 2 characters
if (args[0].length < 2) {
  console.error('Component name must be at least 2 characters long');
  process.exit(1);
}

// Check if name does not start with prefix
if (args[0].startsWith('dfx-')) {
  console.error('Component name must not start with prefix');
  process.exit(1);
}

const component: Component = {
  name: toPascalCase(args[0]),
  tag: args[0].toLowerCase(),
  path: path.join(__dirname, '..', '..', 'src', 'components', args[0].toLowerCase()),
};

// Create new folder in components directory if component does not exist already
createComponentFolder(component);
// Add new component to src/index.ts
addComponentToGlobalIndex(component);
// Create index file
createComponentFile('index.ts', componentIndexTemplate(component));
// Create style file
createComponentFile(`${component.tag}.css`, styleTemplate());
// Create component file
createComponentFile(`${component.tag}.ts`, componentTemplate(component));
// Create test file
createComponentFile(`${component.tag}.test.ts`, testTemplate(component));
// Create stories file
createComponentFile(`${component.tag}.stories.ts`, storiesTemplate(component));

// Print created file structure
console.log(
  `New component "${component.name}" generated successfully!

src/
├─ ${component.tag}/
│  ├─ index.ts
│  ├─ ${component.tag}.css
│  ├─ ${component.tag}.stories.ts
│  ├─ ${component.tag}.test.ts
│  └─ ${component.tag}.ts
└─ index.ts`,
);

// Convert string from kebab case to pascal case
function toPascalCase(value: string) {
  return value
    .toLowerCase()
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Create new folder in components directory if component does not exist already
function createComponentFolder(component: Component) {
  try {
    fs.mkdirSync(component.path);
  } catch {
    console.error(`Component "${component.tag}" already exists`);
    process.exit(1);
  }
}

// Add new component to src/index.ts, sort alphabetically with empty line at the end
function addComponentToGlobalIndex(component: Component) {
  try {
    const indexFile = path.join(__dirname, '..', '..', 'src', 'index.ts');
    const fileContent = fs.readFileSync(indexFile, 'utf8');
    const lines = fileContent.split('\n');
    lines.push(globalIndexTemplate(component));
    lines.sort((a: string, b: string) => {
      if (a === '') return 1;
      if (b === '') return -1;
      return a.localeCompare(b);
    });
    fs.writeFileSync(indexFile, lines.join('\n'));
  } catch (error) {
    console.error(`Error reading or writing file: ${error}`);
    process.exit(1);
  }
}

// Create new file in component folder
function createComponentFile(filename: string, content: string) {
  const filePath = path.join('src', 'components', component.tag, filename);
  try {
    fs.writeFileSync(filePath, content);
  } catch (error) {
    console.error(`Error writing file: ${error}`);
    process.exit(1);
  }
}
