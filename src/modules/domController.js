export const elements = {
  main: document.querySelector("main"),
  hero: document.querySelector(".hero"),
  quiz: document.querySelector(".quiz"),
  categoryList: document.querySelector(".quiz-categories__list"),
  submitBtn: document.querySelector(".submit-btn"),
  title: {
    text: document.querySelector(".title__type"),
    icon: document.querySelector(".title__icon"),
  },
  header: document.querySelector("header"),
  toggleSwitch: document.querySelector(".toggle-mode"),
  modeToggle: document.getElementById("mode-toggle"),
};

export const components = {
  container: document.createElement("section"),
  questions: document.createElement("div"),
  options: document.createElement("div"),
  gameOver: document.createElement("div"),
};

export function renderQuestions(obj) {
  const questions = components.questions;
  questions.classList.add("questions");
  questions.innerHTML = "";

  questions.innerHTML = `
      <div class="questions__texts">
        <p class="question__count">Question ${obj.currentCount} of ${obj.allCount}</p>
        <h1 class="question__body">${obj.question}</h1>
      </div>
      <div class="questions__indicator">
        <progress id="indicator" max="100" value="${obj.percent}">${obj.percent}</progress>
      </div>
    

    `;
  if (!elements.quiz.contains(questions)) elements.quiz.appendChild(questions);
}

export function renderOptions(arr) {
  if (arr.length <= 0 || arr.length > 4) return;
  const choice = ["A", "B", "C", "D"];
  const optionsContainer = components.options;
  optionsContainer.classList.add('"options');
  optionsContainer.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.setAttribute("type", "button");
    btn.dataset.selected = false;
    const option = arr[i];
    // btn.innerHTML = `<span class="option__letter">${choice[i]}</span> <span class="option__text">${option}</span> <span class ="status"> </span> `;
    const optionLetter = document.createElement("span");
    const optionText = document.createElement("span");
    const status = document.createElement("span");

    optionLetter.classList.add("option__letter");
    optionText.classList.add("option__text");
    status.classList.add("status");

    optionLetter.textContent = choice[i];
    optionText.textContent = option;

    btn.appendChild(optionLetter);
    btn.appendChild(optionText);
    btn.appendChild(status);
    optionsContainer.appendChild(btn);
  }
  const submitBtn = document.createElement("button");
  submitBtn.classList.add("submit-btn");
  submitBtn.textContent = "Submit";
  submitBtn.dataset.next = false;

  const errSpan = document.createElement("span");
  errSpan.classList.add("error");
  optionsContainer.appendChild(submitBtn);
  optionsContainer.appendChild(errSpan);

  if (!elements.quiz.contains(optionsContainer))
    elements.quiz.appendChild(optionsContainer);
}

export function renderGameOver(data) {
  const gameOver = components.gameOver;
  components.questions.innerHTML = "";
  components.options.innerHTML = "";

  gameOver.innerHTML = `
    <h1 class="gameOver">Quiz Completed <span>You Scored...</span></h1>
      <div class="scoreboard">
        <div class="category__info">
          <div class="category__icon">${data.icon}</div>
          <div class="category__type">${data.type}</div>
        </div>
        <div class="score">
          <h2 class="final-score">
              ${data.finalScore}
          </h2>
          <p class="total">Out of <span class="score__count">${data.count}</span></p>
        </div>

        <button class="restart-game"> Play again </button>
      </div>
  `;
  if (!elements.quiz.contains(gameOver)) elements.quiz.appendChild(gameOver);
}
