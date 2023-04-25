const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const reset = document.getElementById("reset-btn");
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const beepSound = document.getElementById("beep-sound");

let intervalId;
let hours = 0;
let minutes = 0;
let seconds = 0;

function startTimer() {
    if ((hoursInput.value == "" && minutesInput.value == "" &&
        secondsInput.value == "") || Number(hoursInput.value) < 1 &&
        Number(minutesInput.value) < 1 && Number(secondsInput.value) < 1) {
        return;
    }

    hours = Number(hoursInput.value);
    minutes = Number(minutesInput.value);
    seconds = Number(secondsInput.value);

    hoursInput.disabled = true;
    minutesInput.disabled = true;
    secondsInput.disabled = true;
    startBtn.disabled = true;

    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    intervalId = setInterval(() => {

        let remainingHours = Math.floor(totalSeconds / 3600);
        let remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
        let remainingSeconds = totalSeconds % 60;

        hoursInput.value = padZero(remainingHours);
        minutesInput.value = padZero(remainingMinutes);
        secondsInput.value = padZero(remainingSeconds);

        if (totalSeconds <= 0) {
            clearInterval(intervalId);
            beepSound.play();
            hoursInput.disabled = false;
            minutesInput.disabled = false;
            secondsInput.disabled = false;
            reset.disabled = false;
            startBtn.disabled = false;
            return;
        }

        totalSeconds--;
    }, 1000);
}

function stopTimer() {
    beepSound.currentTime = 0;
    beepSound.pause();
    clearInterval(intervalId);
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    reset.disabled = false;
    startBtn.disabled = false;
}

function resetTimer() {
    clearInterval(intervalId);
    hours = 0;
    minutes = 0;
    seconds = 0;
    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    startBtn.disabled = false;
}

startBtn.addEventListener("click", startTimer);

stopBtn.addEventListener("click", stopTimer);

reset.addEventListener("click", resetTimer);

function padZero(number) { return number.toString().padStart(2, "0"); }