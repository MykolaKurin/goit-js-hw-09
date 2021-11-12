import Notiflix from 'notiflix';

const form = document.querySelector(".form");
form.addEventListener("submit", onFormData);

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
      setTimeout(() => { 
        if (shouldResolve) {
          resolve({position, delay});
        } else {
          reject({position, delay});
        }
      }, delay)
  })
  }

function onFormData(event) {
  event.preventDefault()
  const {
    elements: { delay, step, amount}
  } = event.currentTarget;
  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);
  let currentAmount = Number(amount.value);
  for (let i = 1; i <= currentAmount; i += 1) {
      createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
      firstDelay += delayStep;
  }
}

refs.form.addEventListener('submit', onSubmit);