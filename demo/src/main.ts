// Import styles
import 'diffix/themes/default.css';
import 'diffix/themes/dark.css';
import './styles.css';

// Import all components
import 'diffix';

// Set theme as soon as possible to prevent flashing on page load
const browserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const theme = localStorage.getItem('theme') || browserTheme;
setTheme(theme);

// Save theme to root element attribute and local storage
function setTheme(theme: string): void {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
  setButtonIcon(theme);
}

// Show/hide svg icon inside toggle button based on theme
function setButtonIcon(theme: string): void {
  const toggleDark = document.getElementById('toggle-dark');
  const toggleLight = document.getElementById('toggle-light');
  if (toggleDark && toggleLight) {
    toggleDark.style.display = theme === 'light' ? 'block' : 'none';
    toggleLight.style.display = theme === 'dark' ? 'block' : 'none';
  }
}

// Fade in body content after custom elements are defined
customElements.whenDefined('dfx-button').then(() => document.body.classList.add('ready'));

// Toggle theme on button click
document.querySelector('#toggle-theme')?.addEventListener('dfx-click', () => {
  setTheme(localStorage.getItem('theme') === 'light' ? 'dark' : 'light');
});
