export const preloader = () => {
  const wrapper = document.createElement('div');
  const mainCircle = document.createElement('div');
  const greenCircle = document.createElement('div');
  const brownCircle = document.createElement('div');

  wrapper.classList.add('wrapper');
  mainCircle.classList.add('main-circle');
  greenCircle.classList.add('green-circle');
  brownCircle.classList.add('brown-circle');

  wrapper.append(mainCircle, greenCircle, brownCircle);


  return wrapper;
};


