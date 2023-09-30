import {createForm} from '../components/createForm.js';
import {createTitle} from '../components/createTitle.js';
import {createTodoList} from '../components/createTodoList.js';
import {createTodoItemApi, getTodoList} from '../components/todoApi.js';
import {render} from '../utils/render.js';
import {generateId} from '../utils/utils.js';
export const dadArray = JSON.parse(localStorage.getItem('dadArray')) || [];
export const dadArrayApi = await getTodoList('dadApi');


export const dadPage = () => {
  const mainContainerMyPage = document.createElement('div');
  const myTitle = createTitle('Список дел папы');
  const form = createForm(dadArray);
  const list = createTodoList();
  const selectionButtonDad = document.querySelector('.btn-info');

  mainContainerMyPage.append(myTitle, form.form, list);

  let useServerStorageDad = true;


  selectionButtonDad.addEventListener('click', () => {
    useServerStorageDad = !useServerStorageDad;
    if (useServerStorageDad) {
      selectionButtonDad.textContent = 'Перейти на локальное хранилище';
      document.querySelector('.indicatortext').textContent = 'Server';
      document.querySelector('.indicator').classList.add('active');
      document.querySelector('.list-item').textContent = '';

      render(dadArrayApi, list);
    } else {
      selectionButtonDad.textContent = 'Перейти на серверное хранилище';
      document.querySelector('.indicatortext').textContent = 'Local';
      document.querySelector('.indicator').classList.remove('active');
      document.querySelector('.list-item').textContent = '';

      render(dadArray, list);
    }
  });


  form.form.addEventListener('submit', (e) => {
    e.preventDefault();

    document.querySelector('.list-item').textContent = '';

    const inputDad = document.querySelector('.form-control').value;

    if (!useServerStorageDad) {
      const owner = 'dadApi';
      const name = inputDad;

      createTodoItemApi({owner, name});
      render(dadArrayApi, list);
    } else {
      const newItem = {};

      newItem.name = inputDad;
      newItem.done = false;
      newItem.id = generateId();

      document.querySelector('.form-control').value = '';
      document.querySelector('.btn-primary').disabled = true;
      dadArray.push(newItem);

      localStorage.setItem('dadArray', JSON.stringify(dadArray));
      render(dadArray, list);
    }
  });


  if (!useServerStorageDad) {
    render(dadArrayApi, list);
  } else {
    render(dadArray, list);
  }

  return mainContainerMyPage;
};

