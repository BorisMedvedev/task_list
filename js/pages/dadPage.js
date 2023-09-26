import {createForm} from '../components/createForm.js';
import {createTitle} from '../components/createTitle.js';
import {createTodoItem} from '../components/createTodoItem.js';
import {createTodoList} from '../components/createTodoList.js';
import {generateId} from '../utils/utils.js';
export const dadArray = JSON.parse(localStorage.getItem('dadArray')) || [];

export const dadPage = () => {
  const mainContainerMyPage = document.createElement('div');
  const myTitle = createTitle('Список дел папы');
  const form = createForm(dadArray);
  const list = createTodoList();

  mainContainerMyPage.classList.add('container');

  mainContainerMyPage.append(myTitle, form.form, list);


  form.form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.list-item').textContent = '';
    const input = document.querySelector('.form-control').value;

    const newItem = {};
    newItem.name = input;
    newItem.done = false;
    newItem.id = generateId();

    document.querySelector('.form-control').value = '';
    document.querySelector('.btn').disabled = true;
    dadArray.push(newItem);
    localStorage.setItem('dadArray', JSON.stringify(dadArray));
    for (const item of dadArray) {
      list.append(createTodoItem(item));
    }
  });

  for (const item of dadArray) {
    list.append(createTodoItem(item));
  }

  return mainContainerMyPage;
};
