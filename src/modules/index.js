import '../style.css'
import { QuizApp } from "./app.js";




const app = new QuizApp()

app.initialize()

window.addEventListener("DOMContentLoaded", () => {
document.body.style.visibility = "visible";
});