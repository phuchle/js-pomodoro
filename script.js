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
    this.time++;
    this.updateTimeDisplayElement();
  }

  subtractTime() {
    this.time--;
    this.updateTimeDisplayElement();
  }

  updateTimeDisplayElement() {
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
    countdown();
  });

}

var countdown = (mode) => {
  var countdownTimer = document.getElementById('countdown');
  var minutes;
  var seconds = 0;
  if (mode === 'break') {
    var breakLength = document.getElementById('breakTimer').innerText;
    minutes = parseInt(breakLength);
  } else {
    minutes = parseInt(countdownTimer.innerText);
  }

  function updateTimer() {
    if (seconds < 10) {
        countdownTimer.innerText = minutes + ':' + '0' + seconds.toString();
    } else {
      countdownTimer.innerText = minutes + ':' + seconds;
    }

    if (minutes === 0 && seconds === 0) {
      mode === 'break' ? countdown('work') : countdown('break');
    }
    else if (seconds === 0) {
      seconds = 59;
      minutes--;
    } else {
      seconds--;
    }
  }
  
  window.setInterval(updateTimer, 1000)
}

document.addEventListener('DOMContentLoaded', () => {
  addTimeChangeDetection();
});
