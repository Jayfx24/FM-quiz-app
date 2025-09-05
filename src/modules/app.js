import {
  components,
  elements,
  renderOptions,
  renderQuestions,
} from "./domController";
import { quizData } from "./processData";
import data from "../data.json";
export class QuizApp {
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
      const target = e.target.closest(".submitBtn");
      if (!target) return;

      const optionSelected = [...document.querySelectorAll(".option")].filter(
        (el) => el.dataset.selected === "true"
      );

      if (!optionSelected) return;

      console.log("option selected, can proceed!");
      console.log(optionSelected);
      // show whether selected option is correct/not by adding an svg to the btn 
      // create a function that compares the btn answer to the answer to show if it matches,
      // if it doesn't add the wrong tag to it and add to the btn with the answer
    });
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
