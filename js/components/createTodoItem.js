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

  btnDone.addEventListener('click', () => {
    obj.done;
    obj.done = !obj.done;

    if (obj.done) {
      todoItem.classList.add('active');
    } else {
      todoItem.classList.remove('active');
    }
  });

  btnDelete.addEventListener('click', () => {
    if (confirm('Вы уверенны ?')) {
      todoItem.remove();
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === obj.id) arr.splice(i, 1);
      }
    }
  });


  return todoItem;
};
