export const loadTodoItemsApi = async () => {
  const response = await fetch('http://localhost:3000/api/todos');
  const data = await response.json();
  console.log(data);
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

export const getTodoItemApi = async () => {
  const response = await fetch('http://localhost:3000/api/todos/1608029025426');
  const data = await response.json();
  console.log(data);
};

export const markTodoAsDoneApi = async () => {
  const response = await fetch('http://localhost:3000/api/todos/1608029025426', {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({done: true}),
  });
  const data = await response.json();
  console.log(data);
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
