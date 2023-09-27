import {navigations} from '../utils/navigation.js';
import {preloader} from '../utils/preloader.js';

export const headerNav = () => {
  const header = document.createElement('header');
  const navigation = document.createElement('nav');
  const momLink = document.createElement('a');
  const dadLink = document.createElement('a');
  const myLink = document.createElement('a');

  const selectionButton = document.createElement('button');

  selectionButton.classList.add('btn', 'btn-info');
  selectionButton.textContent = 'Перейти на серверное хранилище';
  momLink.textContent = 'Список дел мамы';
  dadLink.textContent = 'Список дел папы';
  myLink.textContent = 'Список дел мой';

  navigation.classList.add('navigation', 'container');
  momLink.classList.add('link-primary');
  dadLink.classList.add('link-primary');
  myLink.classList.add('link-primary');

  momLink.href = 'mom';
  dadLink.href = 'dad';
  myLink.href = 'my';

  navigation.append(myLink, momLink, dadLink, selectionButton);
  header.append(navigation);

  const load = preloader();
  myLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.main').innerHTML = '';
    document.querySelector('.main').append(load);
    setTimeout(() => {
      load.remove();
      navigations();
    }, 1000);
  });

  dadLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.main').innerHTML = '';
    document.querySelector('.main').append(load);
    setTimeout(() => {
      load.remove();
      navigations('dad');
    }, 1000);
  });

  momLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.main').innerHTML = '';
    document.querySelector('.main').append(load);
    setTimeout(() => {
      load.remove();
      navigations('mom');
    }, 1000);
  });

  let isButtonClicked = false;

  selectionButton.addEventListener('click', () => {
    if (isButtonClicked) {
      selectionButton.textContent = 'Перейти на серверное хранилище';
      selectionButton.classList.remove('active');
      isButtonClicked = false;
    } else {
      selectionButton.textContent = 'Перейти на локальное хранилище';
      selectionButton.classList.add('active');
      isButtonClicked = true;
    }
  });

  return header;
};
