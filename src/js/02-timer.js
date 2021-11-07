import '/css/common.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require("flatpickr/dist/themes/dark.css");
import Notiflix from 'notiflix';

const startButton = document.querySelector('[data-start]');
const inputNode = document.querySelector('#datetime-picker');
const timerNode = document.querySelector('.timer');
const daysNode = document.querySelector('[data-days]');
const hoursNode = document.querySelector('[data-hours]');
const minutesNode = document.querySelector('[data-minutes]');
const secondsNode = document.querySelector('[data-seconds]');

let intervalId = null;
let selectedTime = null;
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
    onClose(selectedDates) {
        selectedTime = selectedDates[0].getTime();

        if (selectedTime === null || selectedTime <= Date.now()) { 
            startButton.disabled = true;
            Notiflix.Notify.failure("Please choose a date in the future");
        }
        else {
            startButton.disabled = false;
        }      
  },
};

flatpickr("#datetime-picker", options);

const timer = {
    start() {
        startButton.disabled = true;
        
        intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = selectedTime - currentTime;
            const time = convertMs(deltaTime);

            if (deltaTime > 0) {
                updateClockface(time);
            
            } else {
                clearInterval(intervalId);
        };   
        }, 1000);
    },
};

startButton.addEventListener('click', () => {
    timer.start();
})

function updateClockface({ days, hours, minutes, seconds }) {
   daysNode.textContent = `${days}`;
   hoursNode.textContent = `${hours}`;
   minutesNode.textContent = `${minutes}`;
   secondsNode.textContent = `${seconds}`;
}

function addLeadingZero(value) {
    return String(value).padStart(2,'0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
