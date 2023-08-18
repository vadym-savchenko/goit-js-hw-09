import { Notify } from 'notiflix/build/notiflix-notify-aio';


const form = document.querySelector('.form');
let formInput = {};
let position = 0;

form.addEventListener('submit', handleSubmitForm);
form.addEventListener('input', handleInputValues);

function handleInputValues(e) {
  formInput[e.target.name] = Number(e.target.value);

 
}

function handleSubmitForm(e) {
  e.preventDefault();
  
  let { delay, step, amount } = formInput;
  for (let i = 1; i <= amount; i+=1) {
    position = i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }

  e.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}