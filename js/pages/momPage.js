import {createForm} from '../components/createForm.js';
import {createTitle} from '../components/createTitle.js';
import {createTodoItem} from '../components/createTodoItem.js';
import {createTodoList} from '../components/createTodoList.js';
import {generateId} from '../utils/utils.js';
export const momArray = JSON.parse(localStorage.getItem('momArray')) || [];

export const momPage = () => {
  const mainContainerMyPage = document.createElement('div');
  const myTitle = createTitle('Список дел мамы');
  const form = createForm();
  const list = createTodoList();

  // mainContainerMyPage.classList.add('container');

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
    document.querySelector('.btn-primary').disabled = true;
    momArray.push(newItem);
    localStorage.setItem('momArray', JSON.stringify(momArray));
    for (const item of momArray) {
      const listItem = createTodoItem(item);
      list.append(listItem.todoItem);
    }
  });

  for (const item of momArray) {
    const listItem = createTodoItem(item);
    list.append(listItem.todoItem);
  }


  return mainContainerMyPage;
};
