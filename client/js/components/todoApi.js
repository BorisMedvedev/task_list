export const loadTodoItems = async () => {
  const response = await fetch('http://localhost:3000/api/todos');
  const data = await response.json();
  console.log(data);
};

export const createTodoItem = async () => {
  const response = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: 'Сходить за хлебом',
      owner: 'Тимофей',
    }),
  });
  const data = await response.json();
  console.log(data);
};
