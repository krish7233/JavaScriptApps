let store = null; //to store the data
const btnEnd = document.querySelector(".btn-end");
const btnStartAgain = document.querySelector(".btn-start-again button");
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const answerOptions = document.querySelectorAll(".answer-options label");
const btnNext = document.querySelector(".btn-next");
const quizContainer = document.querySelector(".quiz-container");
const quizResult = document.querySelector(".quiz-result");
let questionIndex = -1;
let maxQuestions = -1;
let questionList = null;
let isQuizOver = false;

/* function to show question */
const showQuestion = function (type) {
  if (!questionList) questionList = store[type].questions;
  if (maxQuestions < 0)
    maxQuestions = questionList.length; /*initialising maxQuestions*/
  questionNumber.textContent = `${questionIndex + 1}. `;
  questionText.textContent = `${questionList[questionIndex].question}`;
  let index = 0;
  answerOptions.forEach((item) => {
    item.textContent = `${questionList[questionIndex].options[index++]}`;
  });
};

let attemptedQuestions = 0;
let correctAnswers = 0;
const showResult = function () {
  const len = quizResult.children.length;
  for (let i = 0; i < len - 1; i++) {
    let item = quizResult.children[i];

    let divType = item.classList[0];
    let divSpan = document.querySelector(`.${divType} h3 span`);
    switch (divType) {
      case "total": {
        divSpan.textContent = maxQuestions;
        break;
      }
      case "attempted": {
        divSpan.textContent = attemptedQuestions;
        break;
      }
      case "unattempted": {
        divSpan.textContent = maxQuestions - attemptedQuestions;
        break;
      }
      case "correct": {
        divSpan.textContent = correctAnswers;
        break;
      }
      case "incorrect": {
        divSpan.textContent = attemptedQuestions - correctAnswers;
        break;
      }
    }

    quizResult.style.display = "block";
  }
};

/*result Evaluation*/
const resultEvaluation = function (choosedAnswer) {
  if (choosedAnswer) {
    attemptedQuestions++;
    if (questionList[questionIndex].answer == choosedAnswer) correctAnswers++;
  }
};

/*invoking showQuestion function according to subject types*/
let myTimeOut;
const typeSelect = document.getElementById("types");
let subjectType = "";
typeSelect.addEventListener("change", (e) => {
  // console.log(" change event occured");
  quizResult.style.display = "none";
  quizContainer.style.display = "block";
  questionIndex = 0; /*re-initialising questionIndex*/
  questionList = null; /*re-initialising questionList on every type selection*/
  maxQuestions = -1; /*re-initialising maxQuestions*/
  attemptedQuestions = 0;
  correctAnswers = 0;
  isQuizOver = false;
  minutes = 0;
  hours = 0;
  count = 30;
  subjectType = typeSelect.value;
  if (subjectType == "select") alert("please select valid subject");
  else {
    typeSelect.disabled = true;
    showQuestion(subjectType);
    timer();
    myTimeOut = setTimeout(() => {
      if (!isQuizOver) {
        console.log("previous event");
        showResult();
        quizContainer.style.display = "none";
      }
    }, 30000);
  }
});

/*next button functionality*/
btnNext.addEventListener("click", (e) => {
  btnNextFunction();
});

const btnNextFunction = function () {
  let choosedAnswer = toggleChecked();
  resultEvaluation(choosedAnswer);
  questionIndex++;
  if (questionIndex < maxQuestions) {
    showQuestion(subjectType);
  } else {
    isQuizOver = true;
    showResult();
    quizContainer.style.display = "none";
  }
};

const toggleChecked = function () {
  const radioInput = document.querySelectorAll(".answer-options input");
  let choosedAnswer = "";
  for (let i = 0; i < radioInput.length; i++) {
    if (radioInput[i].checked) {
      choosedAnswer = radioInput[i].nextElementSibling.innerText;
      radioInput[i].checked = false;
      break;
    }
  }
  return choosedAnswer;
};

/*listening event on quiz-end button*/
btnEnd.addEventListener("click", (e) => {
  isQuizOver = true;
  clearTimeout(myTimeOut);

  typeSelect.selectedIndex = 0;
  quizContainer.style.display = "none";
  showResult();
});

btnStartAgain.addEventListener("click", (e) => {
  toggleChecked();
  typeSelect.disabled = false;
  typeSelect.selectedIndex = 0;
  quizResult.style.display = "none";
});

// const radioInput = document.querySelectorAll(".answer-options input");
// console.log(radioInput[0].checked);
// console.log(answerOptions);

/*fetchong data from local store using fetch*/

(function () {
  fetch("./questionStore/data.json")
    .then((res) => res.json())
    .then((res) => (store = res));
})();

//timer
const time = document.querySelector(".timer h2");
let minutes = 0;
let hours = 0;
let count = 30;
let timeout;
const timer = function () {
  let result = "";
  if (count < 0 || isQuizOver) {
    isQuizOver = true;
    return true;
  }
  hours = parseInt(count / 3600) % 24;
  minutes = parseInt(count / 60) % 60;
  seconds = count % 60;

  result =
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);

  time.textContent = result;

  count--;
  timeout = setTimeout(() => {
    timer();
  }, 1000);
};
