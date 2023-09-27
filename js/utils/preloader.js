export const preloader = () => {
  const wrapper = document.createElement('div');
  const mainCircle = document.createElement('div');

  wrapper.classList.add('center');
  mainCircle.classList.add('preloader');

  wrapper.append(mainCircle);

  return wrapper;
};

