// --- User Story: I can start a 25 minute pomodoro, and the timer will go off once 25 minutes has elapsed.
// User Story: I can reset the clock for my next pomodoro.
// ---User Story: I can customize the length of each pomodoro.

// TimeController class
// Initial time value, subtract method, add method

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
      var countdown = document.getElementById('countdown');
      countdown.innerText = this.time;
    }
  }
}

var addTimeChangeDetection = () => {
  // select all time buttons
  var subtractBreakTime = document.getElementById('subtractBreakTime');
  var addBreakTime = document.getElementById('addBreakTime');
  var subtractWorkTime = document.getElementById('subtractWorkTime');
  var addWorkTime = document.getElementById('addWorkTime');

  // select session length elements
  var breakTimer = document.getElementById('breakTimer');
  var workTimer = document.getElementById('workTimer');

  var clock = document.getElementById('clock');

  //create time controller objects
  var breakController = new TimeController(breakTimer);
  var workController = new TimeController(workTimer);

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

  clock.addEventListener('click', () => {
    toggleCountdown();
  });

}

var mode = 'work';
function countdown(save) {
  // this function returns updateTimer() which can be toggled
  var breakLength = document.getElementById('breakTimer').innerText;
  var workLength = document.getElementById('workTimer').innerText;
  var countdownTimer = document.getElementById('countdown');
  var minutes;
  var seconds;
  var timer;
  var status = document.getElementById('status');
  // debugger;
  // checks which session mode (break or work) the clock is on
  // if break, sets minutes to breakLength
  // else work, set minutes to workLength
  // debugger;
  if (save) {
    minutes = save.minutes;
    seconds = save.seconds;
  }
  // if (typeof parseInt(countdownTimer.innerText) !== NaN) {
  //   minutes = parseInt(countdownTimer.innerText.split(':')[0]);
  //   seconds = parseInt(countdownTimer.innerText.split(':')[0]);
  // }
  else if (mode === 'break') {
    minutes = parseInt(breakLength);
  } else { // work
    minutes = parseInt(workLength);
    // if (countdownTimer.innerText.length > 2) {
    //   seconds = parseInt(countdownTimer.innerText.substr(-2));
    // }
  }

  return function updateTimer() {
    setStatus(status);
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
      var chime = new Audio('./sounds/chime.mp3');
      chime.play();
      // debugger;
      var newTimer;
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

var setStatus = (status) => {
  if (mode === 'work') {
    status.innerText = 'Workin\'';
  } else if (mode === 'break') {
    status.innerText = 'Chillin\'';
  }
}

var saveTime = () => {
  var save = {}
  var countdownTimer = document.getElementById('countdown');
  var minutes = parseInt(countdownTimer.innerText.split(':')[0]);
  var seconds = parseInt(countdownTimer.innerText.split(':')[1]);

  save.minutes = minutes;
  save.seconds = seconds;
  return save;
}

var countingDown;
var saveFile;
var toggleCountdown = () => {
  // when toggleCountdown is pressed, it will run or stop countdown
  // if countdown is running, it will clear countdown
  var timer = countdown(saveFile);
  if (!countingDown) {
    countingDown = setInterval(timer, 100);
  } else {
    saveFile = saveTime();
    clearInterval(countingDown);
    countingDown = null;
  }
}


document.addEventListener('DOMContentLoaded', () => {
  addTimeChangeDetection();
});
