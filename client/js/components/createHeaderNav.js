import {navigations} from '../utils/navigation.js';
import {preloader} from '../utils/preloader.js';
import {createTodoItem} from './createTodoItem.js';
import {createTodoList} from './createTodoList.js';

export const headerNav = () => {
  const header = document.createElement('header');
  const navigation = document.createElement('nav');
  const momLink = document.createElement('a');
  const dadLink = document.createElement('a');
  const myLink = document.createElement('a');
  const indicator = document.createElement('span');
  const indicatorText = document.createElement('span');

  const selectionButton = document.createElement('button');

  selectionButton.classList.add('btn', 'btn-info');
  indicator.classList.add('indicator');
  indicatorText.classList.add('indicatortext');
  selectionButton.textContent = 'Перейти на серверное хранилище';
  momLink.textContent = 'Список дел мамы';
  dadLink.textContent = 'Список дел папы';
  myLink.textContent = 'Список дел мой';
  indicatorText.textContent = 'Local';

  navigation.classList.add('navigation', 'container');
  momLink.classList.add('link-primary');
  dadLink.classList.add('link-primary');
  myLink.classList.add('link-primary');

  momLink.href = 'mom';
  dadLink.href = 'dad';
  myLink.href = 'my';

  navigation.append(myLink, momLink, dadLink, selectionButton, indicator, indicatorText);
  header.append(navigation);

  const load = preloader();
  myLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.main').innerHTML = '';
    document.querySelector('.main').append(load);
    setTimeout(() => {
      load.remove();
      navigations();
    }, 500);
  });

  dadLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.main').innerHTML = '';
    document.querySelector('.main').append(load);
    setTimeout(() => {
      load.remove();
      navigations('dad');
    }, 500);
  });

  momLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.main').innerHTML = '';
    document.querySelector('.main').append(load);
    setTimeout(() => {
      load.remove();
      navigations('mom');
    }, 500);
  });

  const TODO_API_URL = 'http://localhost:3000/api/todos';
  let useServerStorage = false;
  const list = createTodoList();

  const newServerData = JSON.parse(
      localStorage.getItem('storageStatus')) || [];
  selectionButton.addEventListener('click', () => {
    if (useServerStorage = !useServerStorage) {
      selectionButton.textContent = 'Перейти на локальное хранилище';
      indicatorText.textContent = 'Server';
      indicator.classList.add('active');
    } else {
      selectionButton.textContent = 'Перейти на серверное хранилище';
      indicatorText.textContent = 'Local';
      indicator.classList.remove('active');
    }


    const loadTodoItems = async () => {
      document.querySelector('.list-item').innerHTML = '';

      list.innerHTML = '';
      if (useServerStorage) {
        const response = await fetch(TODO_API_URL);
        const serverData = await response.json();
        newServerData.forEach(element => {
          const newItem = createTodoItem(element);
          document.querySelector('.list-item').append(newItem.todoItem);
        });
        localStorage.setItem('storageStatus', JSON.stringify(serverData));
      } else {
        window.location.reload();
      }
    };
    loadTodoItems();
  });
  return header;
};
