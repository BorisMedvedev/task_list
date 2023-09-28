import {navigations} from '../utils/navigation.js';
import {preloader} from '../utils/preloader.js';

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

  // let isButtonClicked = false;

  // selectionButton.addEventListener('click', () => {
  //   if (isButtonClicked) {
  //     selectionButton.textContent = 'Перейти на серверное хранилище';
  //     selectionButton.classList.remove('active');
  //     info.textContent = 'Сейчас локальное хранилище';
  //     isButtonClicked = false;
  //   } else {
  //     selectionButton.textContent = 'Перейти на локальное хранилище';
  //     selectionButton.classList.add('active');
  //     info.textContent = 'Сейчас серверное хранилище';
  //     isButtonClicked = true;
  //   }
  // });

  const TODO_API_URL = 'https://your-todo-api-example.com';
  let useServerStorage = false;

  selectionButton.addEventListener('click', () => {
    useServerStorage = !useServerStorage;
    selectionButton.textContent = useServerStorage ?
    'Перейти на локальное хранилище' :
    'Перейти на серверное хранилище';

    const loadTodoItems = async () => {
      // Очистите текущий список дел
      // ... (здесь должен быть ваш код)

      if (useServerStorage) {
        // Загрузите данные с сервера через API
        const response = await fetch(TODO_API_URL);
        const serverData = await response.json();
        // displayTodoItems(serverData);
      } else {
        // Загрузить данные из локального хранилища
        // ... (здесь должен быть ваш код)
      }
    };
    loadTodoItems();
  });
  return header;
};
