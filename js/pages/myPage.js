import {createForm} from '../components/createForm.js';
import {createTitle} from '../components/createTitle.js';
import {createTodoItem} from '../components/createTodoItem.js';
import {createTodoList} from '../components/createTodoList.js';
import {generateId} from '../utils/utils.js';
export const myArray = JSON.parse(localStorage.getItem('myArray')) || [];

export const myPage = () => {
  const mainContainerMyPage = document.createElement('div');
  const myTitle = createTitle('Мой список');
  const form = createForm();
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
    myArray.push(newItem);
    localStorage.setItem('myArray', JSON.stringify(myArray));
    for (const item of myArray) {
      list.append(createTodoItem(item));
    }
  });

  for (const item of myArray) {
    list.append(createTodoItem(item));
  }

  return mainContainerMyPage;
};
