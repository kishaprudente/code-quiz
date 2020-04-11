var secsElement = document.querySelector("#secs");
var startButton = document.querySelector("#start-quiz");
var messageElement = document.querySelector("h1");
var mainElement = document.querySelector("#main-content");
var body = document.querySelector("body");
var textElement = document.querySelector("p");
var choicesListElement = document.querySelector("#choices-list");
var indicatorElement = document.querySelector("#indicator");
var timerView = document.querySelector("#timer-view");
var highScoreView = document.querySelector("#highscore-views");
var nextButton = document.createElement("button");
var formElement = document.createElement("div");
var highscoresElement = document.createElement("div");
var textInputElement = document.createElement("input");
var formButton = document.createElement("button");
var backButton = document.createElement("button");
var clearButton = document.createElement("button");

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

var highscore = {
  initials: "",
  score: 0,
};
var highscores = [];
var secondsLeft;
var timerInterval;
// var score;
// var initials = "";

init();

function init() {
  secondsLeft = 30;
  score = 0;
}

function startQuiz() {
  textElement.remove();
  startButton.remove();
  timerInterval = setInterval(function () {
    secondsLeft--;
    secsElement.textContent = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);

  renderQuestions();
}

function renderQuestions(questionNumber) {
  questionNumber = questionNumber || 0;
  var questionItem = questions[questionNumber];
  messageElement.textContent = questionItem.question;

  var newChoices = document.createElement("div");
  choicesListElement.appendChild(newChoices);

  for (var j = 0; j < questionItem.choices.length; j++) {
    var choice = questionItem.choices[j];

    var li = document.createElement("li");
    li.setAttribute("data-index", j);
    li.textContent = choice;
    newChoices.appendChild(li);

    li.addEventListener("click", function (event) {
      if (
        questionItem.answer ===
        parseInt(event.target.getAttribute("data-index"))
      ) {
        score += 10;
        indicatorElement.innerHTML = "<hr> Correct!";
        indicatorElement.setAttribute("style", "color: green");
      } else {
        secondsLeft -= 5;
        indicatorElement.innerHTML = "<hr> Wrong!";
        indicatorElement.setAttribute("style", "color: red");
      }

      questionNumber++;

      if (questionNumber === questions.length) {
        clearInterval(timerInterval);
        indicatorElement.textContent = "";
        newChoices.remove();
        messageElement.textContent = "Quiz is over!";
        messageElement.appendChild(textElement);
        textElement.textContent = "Your final score is: " + score;

        renderForm();
      } else {
        setTimeout(function () {
          renderQuestions(questionNumber);
          newChoices.remove();
          indicatorElement.textContent = "";
        }, 1000);
      }
    });
  }
}

function renderForm() {
  formElement.textContent = "Enter initials: ";
  formButton.textContent = "Submit";
  mainElement.appendChild(formElement);
  formElement.appendChild(textInputElement);
  formElement.appendChild(formButton);
}

function submitHighscore() {
  var initialInput = document.querySelector("input").value;
  highscore.initials = initialInput;
  highscore.score = score;
  console.log(highscore);
  localStorage.setItem("highscore", JSON.stringify(highscore));
  mainElement.innerHTML = "";
  highScoreView.textContent = "";
  timerView.textContent = "";

  renderHighscores();
}

function renderHighscores() {
  var storedHighscore = JSON.parse(localStorage.getItem("highscore"));
  console.log(storedHighscore);
  messageElement.innerHTML = "Highscores";
  mainElement.appendChild(messageElement);
  console.log(storedHighscore.initials);
  console.log(storedHighscore.score);
  highscoresElement.setAttribute("class", "highscore-element");
  highscoresElement.textContent = `${storedHighscore.initials} - ${storedHighscore.score}`;
  messageElement.appendChild(highscoresElement);
  backButton.textContent = "Back";
  clearButton.textContent = "Clear";
  mainElement.appendChild(backButton);
  mainElement.appendChild(clearButton);
}

function clear() {
  highscoresElement.remove();
}

function back() {
  location.reload();
}

highScoreView.addEventListener("click", function () {
  textElement.remove();
  startButton.remove();
  renderHighscores();
});

startButton.addEventListener("click", startQuiz);
formButton.addEventListener("click", submitHighscore);
backButton.addEventListener("click", back);
clearButton.addEventListener("click", clear);
