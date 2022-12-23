const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false },
      { text: '43', correct: false },
      { text: '55', correct: false }
    ]
  },
  {
    question: 'What is 4 * 7?',
    answers: [
      { text: '344', correct: false },
      { text: '2', correct: false },
      { text: '28', correct: true },
      { text: '77', correct: false }
    ]
  },
  {
    question: 'Which country is called "Maple Country"?',
    answers: [
      { text: 'Canada', correct: true },
      { text: 'US', correct: false },
      { text: 'China', correct: false },
      { text: 'Japan', correct: false }
    ]
  }
]

//get questions from database and truck the index of the question
let shuffledQuestions, currentQuestionIndex;

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElements = document.getElementById("question-container");
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion(shuffledQuestions, currentQuestionIndex);
})

function startGame() {
  // console.log("started");
  startButton.classList.add("hide");
  //sort the questions in random order
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElements.classList.remove("hide");

  setNextQuestion(shuffledQuestions, currentQuestionIndex);
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function setNextQuestion(shuffledQuestions, currentQuestionIndex) {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  //set the page background color to correct or wrong mode
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    //set the button background color to correct or wrong mode
    setStatusClass(button, button.dataset.correct);
  });
  //check whether there is question left in the database, yes--countinue; no--restart
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    //show the next button when u click the answer
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

