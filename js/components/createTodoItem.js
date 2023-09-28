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

  return {
    todoItem,
    btnDone,
    btnDelete,
  };
};
