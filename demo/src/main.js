/* eslint-disable */
import 'diffix-test/themes/default.css';
import 'diffix-test/themes/dark.css';
import './styles.css';

// Import all components
import 'diffix-test';

// Toggle theme on button click
document.querySelector('#toggle-theme').addEventListener('dfx-click', () => {
  setTheme(localStorage.getItem('theme') === 'light' ? 'dark' : 'light');
});
