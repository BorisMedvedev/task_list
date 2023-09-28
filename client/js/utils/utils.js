export const generateId = () => {
  let id = '';
  const digits = '0123456789';

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    id += digits[randomIndex];
  }

  return id;
};


