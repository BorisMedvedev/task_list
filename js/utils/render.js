export const render = (arr, app) => {
  for (const item of arr) {
    app.prepend(item);
  }
};

