var secsElement = document.querySelector("#secs");
var startButton = document.querySelector("#start-quiz");
var timerSpan = document.createElement("span");

var questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["A. <Javascript>", "B. <js>", "C. <script>"],
    answer: 2,
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    choices: [
      "A. The <head> section",
      "B. The <body> section",
      "C. Both are correct",
    ],
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choices: [
      "A. <script href='xx.js'>",
      "B. <script name='xx.js'>",
      "C. <script src='xx.js'>",
    ],
    answer: 2,
  },
  {
    question: "Which class provides a responsive fixed width container?",
    choices: ["A. .container-fluid", "B. .container-fixed", "C. .container"],
    answer: 1,
  },
  {
    question: "What does HTML stand for?",
    choices: [
      "A. Hyper Text Markup Language",
      "B. Hyperlinks and Text Markup Language",
      "C. Home Tool Markup Language",
    ],
    answer: 0,
  },
];

var secondsLeft = 60;

function startCountdown() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    secsElement.textContent = secondsLeft;
    console.log(secondsLeft);

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

startButton.addEventListener("click", startCountdown);

questions.forEach((question) => console.log(question));
