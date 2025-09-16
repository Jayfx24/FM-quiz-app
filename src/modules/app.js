import {
  components,
  elements,
  renderOptions,
  renderQuestions,
  renderGameOver,
} from "./domController";
import { quizData } from "./processData";
import data from "../data.json";
import correctIcon from "../assets/images/icon-correct.svg";
import incorrectIcon from "../assets/images/icon-incorrect.svg";
import accessibilityIcon from "../assets/images/icon-accessibility.svg";
import htmlIcon from "../assets/images/icon-html.svg";
import cssIcon from "../assets/images/icon-css.svg";
import jsIcon from "../assets/images/icon-js.svg";

export class QuizApp {
  #currentAnswer = null;
  #playerSCore = 0;
  #categoryIconInfo = null;

  constructor() {
    this.isGameOn = this.data = this.questions = null;
    this.shownQuestions = new Set();
  }

  initialize() {
    // const userChoiceEvent = (e) => {
    // };
    this._bindEvent();
  }

  _userChoiceEvent() {
    elements.hero.addEventListener("click", (e) => {
      const icons = {
        HTML: { icon: htmlIcon, class: "icon-wrapper--html" },
        CSS: { icon: cssIcon, class: "icon-wrapper--css" },
        JavaScript: { icon: jsIcon, class: "icon-wrapper--js" },
        Accessibility: { icon: accessibilityIcon, class: "icon-wrapper--a11y" },
      };

      const target = e.target.closest(".quiz-categories__button");
      if (!target) return;

      const value = target.value;
      this.data = quizData(data, value);

      this.questions = this.data.questions;

      const title = this.data.title;
      const selectedCategory = icons[title]
      this.#categoryIconInfo = {
        html: `<img src="${selectedCategory.icon}" alt="${title}">`,
        title: title,

      };

      elements.title.text.textContent = title;
      elements.title.icon.innerHTML = this.#categoryIconInfo.html;
      elements.title.icon.classList.add(selectedCategory.class)
      elements.hero.style.display = "none";

      this._renderDisplay();
      elements.quiz.classList.toggle("hide");
      console.log("err here");
    });
  }

  _restartGameEvent() {
    elements.quiz.addEventListener("click", (e) => {
      const target = e.target.closest(".restart-game");
      if (!target) return;

      elements.quiz.innerHTML = "";
      elements.hero.style.display = "";
      this.#categoryIconInfo = this.questions = null;
      this.shownQuestions.clear();
      elements.quiz.classList.toggle("hide");

      this.#playerSCore = 0;
    });
  }
  _optionsEvent() {
    elements.quiz.addEventListener("click", (e) => {
      const target = e.target.closest(".option");
      if (!target) return;

      document
        .querySelectorAll(".option")
        .forEach((el) => (el.dataset.selected = false));

      target.dataset.selected = true;
      document.querySelector(".error").textContent = "";
    });
  }

  _submitEvent() {
    elements.quiz.addEventListener("click", (e) => {
      const target = e.target.closest(".submit-btn");
      if (!target) return;

      if (target.dataset.next === "true") {
        this._renderDisplay();
        return;
      }
      const optionSelected = [...document.querySelectorAll(".option")].find(
        (el) => el.dataset.selected === "true"
      );

      if (!optionSelected) {
        document.querySelector(".error").textContent =
          "Please select an answer";
        return;
      }

      const canContinue = this._validateAnswer(optionSelected);
      if (canContinue) {
        console.log(target);
        target.textContent = "Next Question";
        target.dataset.next = true;
      }
    });
  }

  _validateAnswer(el) {
    const rightAnswer =
      el.querySelector(".option__text").textContent === this.#currentAnswer;

    // update btn and add class to update btn bg

    const rightIcon = `<img src="${correctIcon}" alt="correct answer" class="status-icon">`;
    const wrongIcon = `<img src="${incorrectIcon}"  alt="wrong answer" class="status-icon"">`;
    const userOptionStatus = el.querySelector(".status");

    if (rightAnswer) {
      userOptionStatus.innerHTML = rightIcon;
      this.#playerSCore++;
      return true;
    }

    const getCorrectBtn = [...document.querySelectorAll(".option")].find(
      (el) => {
        return (
          el.querySelector(".option__text").textContent === this.#currentAnswer
        );
      }
    );

    getCorrectBtn.querySelector(".status").innerHTML = rightIcon;
    userOptionStatus.innerHTML = wrongIcon;
    return true;
  }
  _selectedOption(e) {
    const target = e.target.closest(".option");
    if (!target) return;
  }

  _renderDisplay() {
    if (
      this.questions.length > 0 &&
      this.questions.length === this.shownQuestions.size
    ) {
      // gameOver logic left and displaying final score
      console.log("here");
      const gameData = {
        icon: this.#categoryIconInfo.html,
        type: this.#categoryIconInfo.title,
        finalScore: this.#playerSCore,
        count: this.questions.length,
      };

      renderGameOver(gameData);

      return;
    }

    const questions = this.questions.filter(
      (q) => !this.shownQuestions.has(q.question)
    );
    console.log(questions);
    console.log(this.questions);
    console.log(this.shownQuestions);

    const newQ = questions.pop();
    this.shownQuestions.add(newQ.question);
    this.#currentAnswer = newQ.answer;

    const questionsInfo = {
      question: newQ.question,
      currentCount: this.shownQuestions.size,
      allCount: this.questions.length,
      percent: (this.shownQuestions.size * 100) / this.questions.length,
    };

    renderQuestions(questionsInfo);
    renderOptions(newQ.options);
  }

  _bindEvent() {
    this._userChoiceEvent();
    this._optionsEvent();
    this._submitEvent();
    this._restartGameEvent();
    this._modeListener();
  }

  _modeListener() {
    elements.header.addEventListener("click", (e) => {
      const target = e.target.closest("#mode-toggle");

      if (!target) return;
      document.body.classList.toggle("dark");
    });
  }
}
