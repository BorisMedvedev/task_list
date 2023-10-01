import {createForm} from '../components/createForm.js';
import {createTitle} from '../components/createTitle.js';
import {createTodoList} from '../components/createTodoList.js';
import {createTodoItemApi, getTodoList} from '../components/todoApi.js';
import {render} from '../utils/render.js';
import {generateId} from '../utils/utils.js';
export const myArray = JSON.parse(localStorage.getItem('myArray')) || [];
export const myArrayApi = await getTodoList('myApi');

export const myPage = () => {
  const mainContainerMyPage = document.createElement('div');
  const myTitle = createTitle('Мой список');
  const form = createForm();
  const list = createTodoList();
  const selectionButton = document.querySelector('.btn-info');
  mainContainerMyPage.append(myTitle, form.form, list);

  console.log(myArrayApi);
  let useServerStorage = true;


  selectionButton.addEventListener('click', () => {
    console.log(useServerStorage);
    useServerStorage = !useServerStorage;
    if (!useServerStorage) {
      selectionButton.textContent = 'Перейти на локальное хранилище';
      document.querySelector('.indicatortext').textContent = 'Server';
      document.querySelector('.indicator').classList.add('active');
      document.querySelector('.list-item').textContent = '';
    } else {
      selectionButton.textContent = 'Перейти на серверное хранилище';
      document.querySelector('.indicatortext').textContent = 'Local';
      document.querySelector('.indicator').classList.remove('active');
      document.querySelector('.list-item').textContent = '';
    }
    if (!useServerStorage) {
      render(myArrayApi, list);
    } else {
      render(myArray, list);
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

      render(myArrayApi, list);
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
