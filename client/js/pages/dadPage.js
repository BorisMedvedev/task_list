import {createForm} from '../components/createForm.js';
import {createTitle} from '../components/createTitle.js';
import {createTodoList} from '../components/createTodoList.js';
import {createTodoItemApi, getTodoList} from '../components/todoApi.js';
import {render} from '../utils/render.js';
import {generateId} from '../utils/utils.js';
export const dadArray = JSON.parse(localStorage.getItem('dadArray')) || [];
export const dadArrayApi = await getTodoList('dadApi');

export const dadPage = () => {
  const mainContainerdadPage = document.createElement('div');
  const dadTitle = createTitle('Список дел Папы');
  const form = createForm();
  const list = createTodoList();
  const selectionButton = document.querySelector('.btn-info');
  mainContainerdadPage.append(dadTitle, form.form, list);

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
      render(dadArrayApi, list);
    } else {
      render(dadArray, list);
    }
  });

  form.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.list-item').textContent = '';
    const input = document.querySelector('.form-control').value;

    if (!useServerStorage) {
      const owner = 'dadApi';
      const name = input;

      const createdItem = await createTodoItemApi({owner, name});
      dadArrayApi.push(createdItem);

      render(dadArrayApi, list);
    } else {
      const newItem = {};

      newItem.name = input;
      newItem.done = false;
      newItem.id = generateId();

      document.querySelector('.form-control').value = '';
      document.querySelector('.btn-primary').disabled = true;
      dadArray.push(newItem);
      localStorage.setItem('dadArray', JSON.stringify(dadArray));

      render(dadArray, list);
    }
  });

  if (!useServerStorage) {
    render(dadArrayApi, list);
  } else {
    render(dadArray, list);
  }

  return mainContainerdadPage;
};
