import {createForm} from '../components/createForm.js';
import {createTitle} from '../components/createTitle.js';
import {createTodoList} from '../components/createTodoList.js';
import {render} from '../utils/render.js';
import {generateId} from '../utils/utils.js';
export const myArray = JSON.parse(localStorage.getItem('myArray')) || [];

export const myPage = () => {
  const mainContainerMyPage = document.createElement('div');
  const myTitle = createTitle('Мой список');
  const form = createForm();
  const list = createTodoList();

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
    myArray.push(newItem);
    localStorage.setItem('myArray', JSON.stringify(myArray));

    render(myArray, list);
  });

  render(myArray, list);

  return mainContainerMyPage;
};
