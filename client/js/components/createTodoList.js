export const createTodoList = () => {
  const list = document.createElement('ul');
  list.classList.add('list-group', 'list-item');

  return list;
};
