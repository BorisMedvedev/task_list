import {createForm} from '../components/createForm.js';
import {headerNav} from '../components/createHeaderNav.js';
import {createTitle} from '../components/createTitle.js';
import {createTodoItem} from '../components/createTodoItem.js';
import {createTodoList} from '../components/createTodoList.js';
import {createTodoItemApi, getTodoList} from '../components/todoApi.js';
import {render} from '../utils/render.js';
import {generateId} from '../utils/utils.js';
export const myArray = JSON.parse(localStorage.getItem('myArray')) || [];
export const myArrayApi = await getTodoList('myApi');
console.log(myArrayApi);

export const myPage = () => {
  const mainContainerMyPage = document.createElement('div');
  const myTitle = createTitle('Мой список');
  const form = createForm();
  const list = createTodoList();
  const header = headerNav();
  mainContainerMyPage.append(myTitle, form.form, list);


  const useServerStorage = false;

  const selectionButton = document.querySelector('.btn-info');

  header.selectionButton.addEventListener('click', () => {
    console.log(useServerStorage);

    if (useServerStorage) {
      selectionButton.textContent = 'Перейти на локальное хранилище';
      header.indicatorText.textContent = 'Server';
      header.indicator.classList.add('active');
    } else {
      selectionButton.textContent = 'Перейти на серверное хранилище';
      header.indicatorText.textContent = 'Local';
      header.indicator.classList.remove('active');
    }
  });


  form.form.addEventListener('submit', (e) => {
    e.preventDefault();

    document.querySelector('.list-item').textContent = '';

    const input = document.querySelector('.form-control').value;

    if (!useServerStorage) {
      const owner = 'myApi';
      const name = input;

      createTodoItemApi({owner, name});
    } else {
      const newItem = {};

      newItem.name = input;
      newItem.done = false;
      newItem.id = generateId();

      document.querySelector('.form-control').value = '';
      document.querySelector('.btn-primary').disabled = true;
      myArray.push(newItem);

      localStorage.setItem('myArray', JSON.stringify(myArray));
      render(myArray, list);
    }
  });

  if (!useServerStorage) {
    render(myArrayApi, list);
  } else {
    render(myArray, list);
  }

  return mainContainerMyPage;
};
