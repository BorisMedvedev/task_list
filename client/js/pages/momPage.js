import {createForm} from '../components/createForm.js';
import {createTitle} from '../components/createTitle.js';
import {createTodoList} from '../components/createTodoList.js';
import { createTodoItemApi } from '../components/todoApi.js';
import {render} from '../utils/render.js';
import {generateId} from '../utils/utils.js';
export const momArray = JSON.parse(localStorage.getItem('momArray')) || [];

export const momPage = () => {
  const mainContainerMyPage = document.createElement('div');
  const myTitle = createTitle('Список дел мамы');
  const form = createForm();
  const list = createTodoList();

  mainContainerMyPage.append(myTitle, form.form, list);

  form.form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.list-item').textContent = '';
    const input = document.querySelector('.form-control').value;
    createTodoItemApi(input);

    const newItem = {};
    newItem.name = input;
    newItem.done = false;
    newItem.id = generateId();

    document.querySelector('.form-control').value = '';
    document.querySelector('.btn-primary').disabled = true;
    momArray.push(newItem);
    localStorage.setItem('momArray', JSON.stringify(momArray));
    render(momArray, list);
  });

  render(momArray, list);


  return mainContainerMyPage;
};
