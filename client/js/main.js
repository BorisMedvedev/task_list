import {headerNav} from './components/createHeaderNav.js';
import {mainPage} from './pages/mainPage.js';
import {navigations} from './utils/navigation.js';

export const todoApp = () => {
  const mainContainer = document.body;
  const header = headerNav();
  const main = mainPage();
  mainContainer.append(header.header, main);
  navigations();
};
todoApp();

