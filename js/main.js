import {headerNav} from './components/createHeaderNav.js';
import {mainPage} from './pages/mainPage.js';
import {myPage} from './pages/myPage.js';

export const todoApp = () => {
  const mainContainer = document.body;
  const header = headerNav();
  const main = mainPage();
  const my = myPage();
  main.append(my);
  mainContainer.append(header, main);
};
todoApp();

