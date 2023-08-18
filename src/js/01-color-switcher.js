const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

const body = document.body;
let changeColorId = null;
stopBtn.setAttribute('disabled', true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', handleSetIntervalChangeBodyColor);
stopBtn.addEventListener('click', handleStopChangeBodyColor);

function handleSetIntervalChangeBodyColor() {
  changeColorId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 800);
  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');
}

function handleStopChangeBodyColor(e) {
  clearInterval(changeColorId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', true);
}

