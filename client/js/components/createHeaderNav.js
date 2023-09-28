import {dadArray} from '../pages/dadPage.js';
import {navigations} from '../utils/navigation.js';
import {preloader} from '../utils/preloader.js';
import {render} from '../utils/render.js';
import {createTodoItem} from './createTodoItem.js';
import {createTodoList} from './createTodoList.js';

export const headerNav = () => {
  const header = document.createElement('header');
  const navigation = document.createElement('nav');
  const momLink = document.createElement('a');
  const dadLink = document.createElement('a');
  const myLink = document.createElement('a');

  const selectionButton = document.createElement('button');
  const info = document.createElement('span');

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

  navigation.append(myLink, momLink, dadLink, selectionButton, info);
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
    useServerStorage = !useServerStorage;
    selectionButton.textContent = useServerStorage ?
    'Перейти на локальное хранилище' :
    'Перейти на серверное хранилище';

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
