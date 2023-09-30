export const loadTodoItemsApi = async () => {
  const response = await fetch('http://localhost:3000/api/todos');
  return await response.json();
};

export const createTodoItemApi = async ({name, owner}) => {
  const response = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    body: JSON.stringify({
      name,
      owner,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

export const getTodoList = async (owner) => {
  const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
  return await response.json();
};

export const markTodoAsDoneApi = async (id, doneStatus) => {
  const response = await fetch(`http://localhost:3000/api/todos/1608029025426=${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({done: doneStatus}),
  });
  return await response.json();
};

export const deleteTodoItemApi = async () => {
  const response = await fetch('http://localhost:3000/api/todos/1608029025426', {
    method: 'DELETE',
  });
  if (response.status === 404) {
    console.log('Не удалось удалить дело, так как его не существует');
  }
  const data = await response.json();
  console.log(data);
};
