const btnStart = document.querySelector('button[data-start]')
console.log(btnStart)
const btnStop = document.querySelector('button[data-stop]')
console.log(btnStop)


btnStart.addEventListener('click', onStartClick)
btnStop.addEventListener('click', onStopClick);

function onStartClick() {
    btnStart.setAttribute("disabled", "disabled");
    btnStop.removeAttribute("disabled")

    setTimeout(() => {
        timerId = setInterval(() => {
            document.body.style.backgroundColor = getRandomHexColor()
        }, 1000)

    });
}
function onStopClick() {
    clearInterval(timerId);
    console.log(`Stop`);
    btnStop.setAttribute("disabled", "disabled")
    btnStart.removeAttribute("disabled")
};


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

