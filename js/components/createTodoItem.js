import {dadArray} from '../pages/dadPage.js';
import {momArray} from '../pages/momPage.js';
import {myArray} from '../pages/myPage.js';

export const createTodoItem = (obj) => {
  const todoItem = document.createElement('li');
  const todoItemText = document.createElement('span');
  const wrapper = document.createElement('div');
  const btnDelete = document.createElement('button');
  const btnDone = document.createElement('button');

  btnDone.classList.add('btn', 'btn-success');
  btnDelete.classList.add('btn', 'btn-danger');

  btnDone.textContent = 'Готово';
  btnDelete.textContent = 'Удалить';

  todoItem.id = obj.id;
  if (obj.done) {
    todoItem.classList.add('active');
  } else {
    todoItem.classList.remove('active');
  }

  todoItemText.textContent = obj.name;
  todoItem.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-center',
  );

  wrapper.append(btnDone, btnDelete);
  todoItem.append(todoItemText, wrapper);

  btnDone.addEventListener('click', (e) => {
    obj.done = !obj.done;

    if (obj.done) {
      todoItem.classList.add('active');
    } else {
      todoItem.classList.remove('active');
    }

    let currentArray;
    let storageName;

    if (myArray.find(item => item.id === obj.id)) {
      currentArray = myArray;
      storageName = 'myArray';
    } else if (momArray.find(item => item.id === obj.id)) {
      currentArray = momArray;
      storageName = 'momArray';
    } else if (dadArray.find(item => item.id === obj.id)) {
      currentArray = dadArray;
      storageName = 'dadArray';
    }

    localStorage.setItem(storageName, JSON.stringify(currentArray));
  });


  const deleteItem = (array, storageName) => {
    btnDelete.addEventListener('click', () => {
      if (confirm('Вы уверенны ?')) {
        todoItem.remove();
        for (let i = 0; i < array.length; i++) {
          if (array[i].id === obj.id) {
            array.splice(i, 1);
          }
        }
        localStorage.setItem(storageName, JSON.stringify(array));
      }
    });
  };

  let currentArray;
  let storageName;

  if (myArray.find(item => item.id === obj.id)) {
    currentArray = myArray;
    storageName = 'myArray';
  } else if (momArray.find(item => item.id === obj.id)) {
    currentArray = momArray;
    storageName = 'momArray';
  } else if (dadArray.find(item => item.id === obj.id)) {
    currentArray = dadArray;
    storageName = 'dadArray';
  }

  deleteItem(currentArray, storageName);

  return {
    todoItem,
    btnDone,
    btnDelete,
  };
};
