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
  }
}
