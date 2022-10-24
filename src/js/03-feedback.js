import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const FEEDBACK_STORAGE_KEY = 'feedback-form-state';
const feedback = getPreviousValue(FEEDBACK_STORAGE_KEY) || {};

setPreviousValue(FEEDBACK_STORAGE_KEY);

formEl.addEventListener('input', throttle(saveToStorage, 500));
formEl.addEventListener('submit', onSubmit);

function saveToStorage(event) {
  feedback[event.target.name] = event.target.value;
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedback));
}

function onSubmit(event) {
  event.preventDefault();
  console.log(getPreviousValue(FEEDBACK_STORAGE_KEY));
  event.currentTarget.reset();
  localStorage.removeItem(FEEDBACK_STORAGE_KEY);
}

function getPreviousValue(key) {
  if (!localStorage.getItem(key)) {
    return;
  }

  return parseJson(key);
}

function setPreviousValue(key) {
  if (!getPreviousValue(key)) {
    return;
  }
  const previousValue = getPreviousValue(key);

  formEl.email.value = previousValue.email || '';
  formEl.message.value = previousValue.message || '';
}

function parseJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.log(error);
  }
}
