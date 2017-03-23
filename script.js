// User Story: I can start a 25 minute pomodoro, and the timer will go off once 25 minutes has elapsed.
// User Story: I can reset the clock for my next pomodoro.
// User Story: I can customize the length of each pomodoro.

// press - or + to subtract or add time values
// when - or +

var getInitialIntervals = () =>  {

}

var addTimeChangeDetection = () => {
  // select all time buttons
  var subtractBreakTime = document.getElementById("subtractBreakTime");
  var addBreakTime = document.getElementById("addBreakTime");
  var subtractWorkTime = document.getElementById("subtractWorkTime");
  var addWorkTime = document.getElementById("addWorkTime");

  var addTimeButtons = [addBreakTime, addWorkTime];
  var subtractTimeButtons = [subtractBreakTime, subtractWorkTime];

  subtractTimeButtons.forEach(button => {
    button.addEventListener("click", () => {
      subtractTime(button);
    });
  });
  addTimeButtons.map(button => {
    return button.addEventListener("click", () => {
      addTime(button);
    });
  });

}

var subtractTime = (button) => {
    // going two siblings over to get to the element, skipping the stuff between
  var timeValue = button.nextSibling.nextSibling.innerText;
  timeValue = parseInt(timeValue);
  timeValue--;
  button.nextSibling.nextSibling.innerText = timeValue;
}

var addTime = (button) => {
  // going two siblings over to get to the element, skipping the stuff between
  var timeValue = button.previousSibling.previousSibling.innerText;
  timeValue = parseInt(timeValue);
  timeValue++;
  button.previousSibling.previousSibling.innerText = timeValue;
}


var updateTimer = () => {

}

document.addEventListener("DOMContentLoaded", () => {
  addTimeChangeDetection();
});
