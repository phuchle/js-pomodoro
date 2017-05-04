let countingDown; // will be truthy if countdown is running, else null
let saveFile; // time left is saved to this object
let mode = 'work'; // default mode begins on a work session

class TimeController {
  constructor(timeDisplayElement) {
    this.timeDisplayElement = timeDisplayElement;
    this.time = parseInt(timeDisplayElement.innerText);
  }

  addTime() {
    if (countingDown) {
      return null;
    } else {
      this.time++;
      this.updateTimeDisplayElement();
    }
  }

  subtractTime() {
    if (countingDown) {
      return null;
    } else {
      this.time--;
      this.updateTimeDisplayElement();
    }
  }

  updateTimeDisplayElement() {
    saveFile = null;
    this.timeDisplayElement.innerText = this.time;

    //update countdown if workTimer is changed
    if (this.timeDisplayElement.id === 'workTimer') {
      let countdown = document.getElementById('countdown');
      countdown.innerText = this.time;
    }
  }
}

function addTimeChangeDetection() {
  let subtractBreakTime = document.getElementById('subtractBreakTime');
  let addBreakTime = document.getElementById('addBreakTime');
  let subtractWorkTime = document.getElementById('subtractWorkTime');
  let addWorkTime = document.getElementById('addWorkTime');


  let breakTimer = document.getElementById('breakTimer');
  let workTimer = document.getElementById('workTimer');
  let clock = document.getElementById('clock');

  let breakController = new TimeController(breakTimer);
  let workController = new TimeController(workTimer);

  subtractBreakTime.addEventListener('click', () => {
    breakController.subtractTime();
  });

  addBreakTime.addEventListener('click', () => {
    breakController.addTime();
  });

  subtractWorkTime.addEventListener('click', () => {
    workController.subtractTime();
  });

  addWorkTime.addEventListener('click', () => {
    workController.addTime();
  });

  clock.addEventListener('click', toggleCountdown);
}

function countdown(save) {
  // this function returns updateTimer() which can be toggled
  let breakLength = document.getElementById('breakTimer').innerText;
  let workLength = document.getElementById('workTimer').innerText;
  let countdownTimer = document.getElementById('countdown');
  let clock = document.getElementById('clock');
  let minutes;
  let seconds;
  let timer;
  // checks which session mode (break or work) the clock is on
  // if break, sets minutes to breakLength
  // else work, set minutes to workLength
  if (save) {
    minutes = save.minutes;
    seconds = save.seconds;
  }
  else if (mode === 'break') {
    minutes = parseInt(breakLength);
  } else { // work
    minutes = parseInt(workLength);
  }

  return function updateTimer() {
    updateClockColor(clock);
    // if seconds are undefined, assigns seconds to 0
    seconds === undefined ? seconds = 0 : seconds;
    // pads seconds if seconds is a single digit
    if (seconds < 10) {
      countdownTimer.innerText = minutes + ':' + '0' + seconds.toString();
    } else {
      countdownTimer.innerText = minutes + ':' + seconds;
    }
    // if you reach the end of a break or work session, automatically go to next session
    if (minutes === 0 && seconds === 0) {
      let chime = new Audio('./sounds/chime.mp3');
      chime.play();
      let newTimer;
      if (mode === 'break') {
        minutes = parseInt(workLength);
        mode = 'work';
        newTimer = countdown();
      } else {
        minutes = parseInt(breakLength);
        mode = 'break';
        newTimer = countdown();
      }
      newTimer();
    } else if (seconds === 0) {
      seconds = 59;
      minutes--;
    } else {
      seconds--;
    }
  }
}

function updateClockColor(clock){
  if (mode === 'work') {
    clock.style.backgroundColor = "#bff55e";
  } else if (mode === 'break') {
    clock.style.backgroundColor = "#f58686";
  }
}

function saveTime(){
  let save = {};
  let countdownTimer = document.getElementById('countdown');
  let minutes = parseInt(countdownTimer.innerText.split(':')[0]);
  let seconds = parseInt(countdownTimer.innerText.split(':')[1]);

  save.minutes = minutes;
  save.seconds = seconds;
  return save;
}

function toggleCountdown(){
  // when toggleCountdown is pressed, it will run or stop countdown
  // if countdown is running, it will clear countdown
  let timer = countdown(saveFile);
  if (!countingDown) {
    countingDown = setInterval(timer, 1000);
  } else {
    saveFile = saveTime();
    clearInterval(countingDown);
    countingDown = null;
  }
}

document.addEventListener('DOMContentLoaded', addTimeChangeDetection);
