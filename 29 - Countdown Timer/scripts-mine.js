const leftTime = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const submit = document.querySelector('#custom');
const date = new Date();

var timer;

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const leftSeconds = seconds % 60;
    const left = `${minutes < 10 ? '0' + minutes : minutes}:${leftSeconds < 10 ? '0' : ''}${leftSeconds}`;
    leftTime.textContent = left;
}

function displayEndTime(timestamp) {
    const endDate = new Date(timestamp);
    const hours = endDate.getHours();
    const minutes = endDate.getMinutes();
    const seconds = endDate.getSeconds();

    const end = `${hours < 12 ? '上午' : '下午'} ${hours < 12 ? 12 : hours - 12}:${
        minutes < 10 ? '0' + minutes : minutes
    }:${seconds < 10 ? '0' + seconds : seconds}`;
    endTime.textContent = end;
}

function updateTime() {
    const seconds = this.dataset.time;
    updateTimer(seconds);
}

function updateTimer(seconds) {
    clearInterval(timer);

    let now = Date.now();
    let end = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(end);

    timer = setInterval(() => {
        seconds--;
        displayTimeLeft(seconds);
        if (seconds === 0) {
            clearInterval(timer);
        }
    }, 1000);
}

buttons.forEach((btn) => btn.addEventListener('click', updateTime));
submit.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    updateTimer(mins * 60);
    this.reset();
});
