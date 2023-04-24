const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const restBtn = document.getElementById("rest-btn");
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const changeBackgroundColor = document.getElementById("changeColor");
const pageBody = document.querySelector("body");
let intervalId;
let hours = 0;
let minutes = 0;
let seconds = 0;

function startStopwatch() {

    if (secondsInput.value == "" && minutesInput.value == "" && secondsInput.value == "") {
        return;
    }
    hours = (hoursInput.value);
    minutes = (minutesInput.value);
    seconds = (secondsInput.value);
    hoursInput.disabled = true;
    minutesInput.disabled = true;
    secondsInput.disabled = true;
    intervalId = setInterval(() => {
        if (hours == 0 && minutes == 0 && seconds == 0) {
            hoursInput.disabled = false;
            minutesInput.disabled = false;
            secondsInput.disabled = false;
            clearInterval(intervalId);
            return;
        }
        seconds--;
        if (seconds === -1) {
            seconds = 59;
            minutes--;
        }

        if (minutes === -1) {
            minutes = 59;
            hours--;
        }
        updateInputs();
    }, 1000);
}


function stopStopwatch() {
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    clearInterval(intervalId);
}

function resetStopwatch() {
    clearInterval(intervalId);
    hours = 0;
    minutes = 0;
    seconds = 0;
    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";
}

function updateInputs() {
    hoursInput.value = padZero(hours).toString();
    minutesInput.value = padZero(minutes).toString();
    secondsInput.value = padZero(seconds).toString();
}

function padZero(number) {
    return number.toString().padStart(2, "0");
}

startBtn.addEventListener("click", startStopwatch);
stopBtn.addEventListener("click", stopStopwatch);
restBtn.addEventListener("click", resetStopwatch);

function changeColor() {
    if (pageBody.style.backgroundColor == "black") {
        pageBody.style.backgroundColor = "white";
    }
    else {
        pageBody.style.backgroundColor = "black";
        
    }
}
changeBackgroundColor.addEventListener("click", changeColor);