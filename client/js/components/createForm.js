export const createForm = () => {
  const form = document.createElement('form');
  const wrapper = document.createElement('div');
  const inputForm = document.createElement('input');
  const addBtn = document.createElement('button');

  form.classList.add('mb-3');
  wrapper.classList.add('input-group');
  addBtn.classList.add('btn', 'btn-primary');
  inputForm.classList.add('form-control');

  addBtn.textContent = 'Добавить задачу';
  inputForm.placeholder = 'Введите новую задачу';

  wrapper.append(inputForm, addBtn);
  form.append(wrapper);

  addBtn.disabled = true;

  inputForm.addEventListener('input', () => {
    if (inputForm.value.trim() !== '') {
      addBtn.disabled = false;
    } else {
      addBtn.disabled = true;
    }
  });


  return (
    form,
    inputForm,
    addBtn
  );
};
