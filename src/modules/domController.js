export const elements = {
  main: document.querySelector("main"),
  hero: document.querySelector(".hero"),
  quiz: document.querySelector(".quiz"),
  categoryList : document.querySelector(".quiz-categories__list"),
};

export const components = {
  container: document.createElement("section"),
  questions: document.createElement("div"),
  options: document.createElement("div"),
};

export function renderQuestions(obj) {
  const questions = components.questions;
  
  questions.innerHTML = `
    <div class="questions">
      <div class="questions__texts">
        <p class="question__count">Question ${obj.currentCount} of ${obj.allCount}</p>
        <h1 class="question__body">${obj.question}</h1>
      </div>
      <div class="questions__indicator">
        <progress id="indicator" max="100" value="${obj.percent}">${obj.percent}</progress>
      </div>
    </div>

    `;
  if (!elements.quiz.contains(questions)) elements.quiz.appendChild(questions);

  
}

export function renderOptions(arr) {
  if (arr.length <= 0 || arr.length > 4) return;
  const choice = ["A", "B", "C", "D"];
  const optionsContainer = components.options;
  for (let i = 0; i < arr.length; i++) {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.setAttribute("type", "button");
    const option = arr[i];
    btn.innerHTML = `<span class="option__letter">${choice[i]}</span> <span class="option__text">${option}</span>`;
    optionsContainer.appendChild(btn);
  }


    if (!elements.quiz.contains(optionsContainer)) elements.quiz.appendChild(optionsContainer);

}
