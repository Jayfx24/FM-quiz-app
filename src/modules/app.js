import {
  components,
  elements,
  renderOptions,
  renderQuestions,
} from "./domController";
import { quizData } from "./processData";
import data from "../data.json";
import correctIcon from "../assets/images/icon-correct.svg";
import incorrectIcon from "../assets/images/icon-incorrect.svg";

export class QuizApp {
  #currentAnswer = null;

  constructor() {
    this.data = this.questions = null;
    this.shownQuestions = new Set();
  }

  initialize() {
    // will hide when  category ha been picked

    elements.categoryList.addEventListener("click", (e) => {
      const target = e.target.closest(".quiz-categories__button");
      if (!target) return;

      const value = target.value;
      this.data = quizData(data, value);
      this.questions = this.data.questions;

      elements.hero.style.display = "none";
      this._handleDisplay();
    });
  }

  handleSubmission() {
    // get user submission and check if correct and wrong
    //
  }
  _optionsEvent() {
    elements.quiz.addEventListener("click", (e) => {
      const target = e.target.closest(".option");
      if (!target) return;

      document
        .querySelectorAll(".option")
        .forEach((el) => (el.dataset.selected = false));

      target.dataset.selected = true;
    });
  }

  _submitEvent() {
    elements.quiz.addEventListener("click", (e) => {
      const target = e.target.closest(".submit-btn");
      if (!target) return;

      const optionSelected = [...document.querySelectorAll(".option")].find(
        (el) => el.dataset.selected === "true"
      );

      if (!optionSelected) return;

      this._validateAnswer(optionSelected);
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.textContent = 'Next Question'

      // show whether selected option is correct/not by adding an svg to the btn
      // create a function that compares the btn answer to the answer to show if it matches,
      // if it doesn't add the wrong tag to it and add to the btn with the answer
    });
  }
  _validateAnswer(el) {
    console.log;
    const rightAnswer =
      el.querySelector(".option__text").textContent === this.#currentAnswer;

    // update btn and add class to update btn bg

    const rightIcon = `<img src="${correctIcon}" alt="correct answer" class="status-icon">`;
    const wrongIcon = `<img src="${incorrectIcon}"  alt="wrong answer" class="status-icon"">`;
    const userOptionStatus = el.querySelector(".status");

    if (rightAnswer) {
      userOptionStatus.innerHTML = rightIcon;
      return;
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
  }
  _selectedOption(e) {
    const target = e.target.closest(".option");
    if (!target) return;
  }

  _handleDisplay() {
    const questions = this.questions.filter((q) => !this.shownQuestions.has(q));

    // randomize questions arr
    const newQ = questions.pop();
    this.shownQuestions.add(newQ.questions);
    this.#currentAnswer = newQ.answer;

    const questionsInfo = {
      question: newQ.question,
      currentCount: this.shownQuestions.size,
      allCount: this.questions.length,
      percent: (this.shownQuestions.size * 100) / this.questions.length,
    };

    renderQuestions(questionsInfo);
    renderOptions(newQ.options);
    this._optionsEvent();
    this._submitEvent();
  }
}
