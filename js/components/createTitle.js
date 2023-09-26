export const createTitle = (text) => {
  const title = document.createElement('h2');
  title.classList.add('h1', 'mb-3');
  title.textContent = text;

  return title;
};
