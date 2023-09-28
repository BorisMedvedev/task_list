import {createTodoItem} from '../components/createTodoItem.js';

export const render = (arr, app) => {
  for (const item of arr) {
    const listItem = createTodoItem(item);
    app.prepend(listItem.todoItem);
  }
};

