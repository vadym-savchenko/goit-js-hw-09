import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

const currentDate = Date.now();
let FinishDateInMs = 0;
let isStarted = false;
let timerId = null;

const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

const datePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (currentDate < selectedDates[0]) {
      if (isStarted) {
        Report.failure('The countdown has already started!');
        return;
      }
      startBtn.removeAttribute('disabled');
      FinishDateInMs = selectedDates[0].getTime();
      return FinishDateInMs;
    }
    if (currentDate > selectedDates[0] || isStarted) {
      Notify.failure('Please choose a date in the future');
      startBtn.setAttribute('disabled', true);
    }
  },
});

startBtn.addEventListener('click', handleCountDown);
startBtn.setAttribute('disabled', true);

function handleCountDown() {
  startBtn.setAttribute('disabled', true);
  Notify.success('Starting countdown');
  isStarted = true;
  startingCountdown();
}

function startingCountdown() {
  timerId = setInterval(() => {
    const updatedDate = Date.now();
    let deltaTime = FinishDateInMs - updatedDate;
    stopInterval(deltaTime);

    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }, 1000);
}

function stopInterval(time) {
  if (time < 1000) {
    Report.success('The countdown is over.');
    clearInterval(timerId);
    return;
  }
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}