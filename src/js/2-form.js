let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

const userForm = loadFromLS('feedback-form-state', {});
form.elements.email.value = userForm.email || '';
form.elements.message.value = userForm.message || '';
formData.email = userForm.email || '';
formData.message = userForm.message || '';

form.addEventListener('input', () => {
  const fd = new FormData(form);
  formData.email = fd.get('email');
  formData.message = fd.get('message');
  saveToLS('feedback-form-state', formData);
});

form.addEventListener('submit', e => {
  e.preventDefault();

  if (!formData.email || !formData.message) {
    console.log('Fill please all fields');
    return;
  }
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  form.reset();
  formData = { email: '', message: '' };
});

function saveToLS(key, value) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}

function loadFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data ?? defaultValue;
  } catch {
    return jsonData ?? defaultValue;
  }
}
