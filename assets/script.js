let timeEl = document.querySelector("p.time");

let secondsLeft = 75;

let scoreEl = document.querySelector("#score");

const introEl = document.querySelector("#intro");

const questionsEl = document.querySelector("#questions");

let questionEl = document.querySelector("#question");

let questionCount = 0;

const yaynayEl = document.querySelector("#yaynay");

const finalEl = document.querySelector("#final");

let initialsInput = document.querySelector("#initials");

const highscoresEl = document.querySelector("#highscores");

let scoreListEl = document.querySelector("#score-list");

let scoreList = [];

const startBtn = document.querySelector("#start");

const ansBtn = document.querySelectorAll("button.ansBtn");

const ans1Btn = document.querySelector("#answer1");

const ans2Btn = document.querySelector("#answer2");

const ans3Btn = document.querySelector("#answer3");

const ans4Btn = document.querySelector("#answer4");

const submitScrBtn = document.querySelector("#submit-score");

const goBackBtn = document.querySelector("#goback");

const clearScrBtn = document.querySelector("#clearscores");

const viewScrBtn = document.querySelector("#view-scores");

/// Questions ////////////////
const questions = [
  // array of objects
  {
    // question 0
    question: "What does HTML stand for?",
    answers: [
      "1.Hyper Text Markup Language",
      "2. Hyper Text Preprocessor",
      "3. Hyper Text Multiple Language",
      "4.Hyper Tool Multi Language ",
    ],
    correctAnswer: "0",
  },
  {
    // question 1
    question: "What does CSS stand for?.",
    answers: [
      "1.Common Style Sheet ",
      "2.  Cascading Style Sheet",
      "3. Colorful Style Sheet",
      "4. Computer Style Sheet",
    ],
    correctAnswer: "1",
  },
  {
    // question 2
    question: "What does PHP stand for?",
    answers: [
      "1. Hypertext Programming",
      "2.Hypertext Preprocessor",
      "3. Hypertext Preprogramming ",
      "4. all of the above",
    ],
    correctAnswer: "1",
  },
  {
    // question 3
    question: "What does SQL stand for?",
    answers: [
      "1. Stylish Question Language",
      "2. Structured Query Language",
      "3. Stylesheet Query Language",
      "4. Statement Question Language",
    ],
    correctAnswer: "1",
  },
  {
    // question 4
    question: "What does XML stand for?",
    answers: [
      "1. eXecutable Multiple Language",
      "2. eXTra Multi-Program Language",
      "3. eXtensible Markup Language",
      "4. eXamine Multiple Language",
    ],
    correctAnswer: "2",
  },
  {
    // question 5
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      "1. Javascript",
      "2. terminal/bash",
      "3. for loops",
      "4. Console.log",
    ],
    correctAnswer: "3",
  },
];

//Set Timer Function
function setTime() {
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = `Time:${secondsLeft}s`;

    if (secondsLeft === 0 || questionCount === questions.length) {
      clearInterval(timerInterval);
      questionsEl.style.display = "none";
      finalEl.style.display = "block";
      scoreEl.textContent = secondsLeft;
    }
  }, 1000);
}

//Start Quiz Function
function startQuiz() {
  introEl.style.display = "none";
  questionsEl.style.display = "block";
  questionCount = 0;
  setTime();
  setQuestion(questionCount);
}

//SetQuestion Function
function setQuestion(id) {
  if (id < questions.length) {
    questionEl.textContent = questions[id].question;
    ans1Btn.textContent = questions[id].answers[0];
    ans2Btn.textContent = questions[id].answers[1];
    ans3Btn.textContent = questions[id].answers[2];
    ans4Btn.textContent = questions[id].answers[3];
  }
}
//CheckAnswer Function
function checkAnswer(event) {
  event.preventDefault();

  // show section for yaynay and append message
  yaynayEl.style.display = "block";
  let p = document.createElement("p");
  yaynayEl.appendChild(p);

  // time out after 1 second
  setTimeout(function () {
    p.style.display = "none";
  }, 1000);

  // answer checker
  if (questions[questionCount].correctAnswer == event.target.value) {
    p.textContent = "Correct!";
  } else if (questions[questionCount].correctAnswer !== event.target.value) {
    secondsLeft = secondsLeft - 10;
    p.textContent = "Wrong!";
  }

  // increment so the questions index is increased
  if (questionCount < questions.length) {
    questionCount++;
  }
  // call setQuestion to bring in next question when any ansBtn is clicked
  setQuestion(questionCount);
}

// Add Score funtion
function addScore(event) {
  event.preventDefault();

  finalEl.style.display = "none";
  highscoresEl.style.display = "block";

  let init = initialsInput.value.toUpperCase();
  scoreList.push({ initials: init, score: secondsLeft });

  // sort scores//
  scoreList = scoreList.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    } else {
      return -1;
    }
  });

  scoreListEl.innerHTML = "";
  for (let i = 0; i < scoreList.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
    scoreListEl.append(li);
  }
  storeScores();
  displayScores();
}

//
function storeScores() {
  localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
  let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

  if (storedScoreList !== null) {
    scoreList = storedScoreList;
  }
}

function clearScores() {
  localStorage.clear();
  scoreListEl.innerHTML = "";
}

startBtn.addEventListener("click", startQuiz);

ansBtn.forEach((item) => {
  item.addEventListener("click", checkAnswer);
});

submitScrBtn.addEventListener("click", addScore);

goBackBtn.addEventListener("click", function () {
  highscoresEl.style.display = "none";
  introEl.style.display = "block";
  secondsLeft = 75;
  timeEl.textContent = `Time:${secondsLeft}s`;
});

clearScrBtn.addEventListener("click", clearScores);

viewScrBtn.addEventListener("click", function () {
  if (highscoresEl.style.display === "none") {
    highscoresEl.style.display = "block";
  } else if (highscoresEl.style.display === "block") {
    highscoresEl.style.display = "none";
  } else {
    return alert("No scores to show.");
  }
});
