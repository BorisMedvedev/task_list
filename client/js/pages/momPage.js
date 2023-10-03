import {createForm} from '../components/createForm.js';
import {createTitle} from '../components/createTitle.js';
import {createTodoList} from '../components/createTodoList.js';
import {createTodoItemApi, getTodoList} from '../components/todoApi.js';
import {render} from '../utils/render.js';
import {generateId} from '../utils/utils.js';
export const momArray = JSON.parse(localStorage.getItem('momArray')) || [];
export const momArrayApi = await getTodoList('momApi');

export const momPage = () => {
  const mainContainermomPage = document.createElement('div');
  const momTitle = createTitle('Список дел Мамы');
  const form = createForm();
  const list = createTodoList();
  const selectionButton = document.querySelector('.btn-info');
  mainContainermomPage.append(momTitle, form.form, list);

  let useServerStorage = true;

  selectionButton.addEventListener('click', () => {
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
      render(momArrayApi, list);
    } else {
      render(momArray, list);
    }
  });

  form.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.list-item').textContent = '';
    const input = document.querySelector('.form-control').value;

    if (!useServerStorage) {
      const owner = 'momApi';
      const name = input;

      const createdItem = await createTodoItemApi({owner, name});
      momArrayApi.push(createdItem);

      render(momArrayApi, list);
    } else {
      const newItem = {};

      newItem.name = input;
      newItem.done = false;
      newItem.id = generateId();

      document.querySelector('.form-control').value = '';
      document.querySelector('.btn-primary').disabled = true;
      momArray.push(newItem);
      localStorage.setItem('momArray', JSON.stringify(momArray));

      render(momArray, list);
    }
  });

  if (!useServerStorage) {
    render(momArrayApi, list);
  } else {
    render(momArray, list);
  }

  return mainContainermomPage;
};
