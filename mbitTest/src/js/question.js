const form = document.querySelector("#question-form");
(() => {
  fetch("../data/data.json")
    .then((res) => res.json())
    .then((data) => {
      const questions = data.questions;
      const answers = data.answers;

      questions.forEach((question) => {
        let questionNumber = question.pk;
        let answerArr = [];
        answers.forEach((answer) => {
          if (questionNumber == answer.question) {
            answerArr.push(answer);
          }
        });
        form.appendChild(setElement(question, answerArr));
      });

      const questionItems = document.querySelectorAll(".question-item");
      const firstQuestionItem = questionItems[0];
      firstQuestionItem.classList.add("on");

      const buttonBoxes = document.querySelectorAll(".button-box");
      const firstButtonBox = buttonBoxes[0];
      const lastButtonBox = buttonBoxes[buttonBoxes.length - 1];

      firstButtonBox.innerHTML = `
        <button type="button" class="next-btn">다음</button>
      `;
      firstButtonBox.classList.add("style-center");

      lastButtonBox.innerHTML = `
        <button type="button" class="previous-btn">이전</button>
        <button type="submit" class="next-btn">제출</button>
      `;
    });
})();

function setElement(question, answerArr) {
  const questionItem = document.createElement("div");
  questionItem.classList.add("question-item");

  const tempContainer = document.createElement("div");

  for (let idx in answerArr) {
    let answer = answerArr[idx];
    tempContainer.innerHTML += `
    <li class="answer-item">
      <input type="radio" id="answer-${answer.pk}" name="question-${
      question.pk
    }" value=${answer.developer}>
      <label for="answer-1">${Number(idx) + 1}. ${answer.content}</label>
    </li>
    `;
  }

  questionItem.innerHTML = `
  <div class="status-box">
    <span>${question.pk}/10</span>
    <div class="status-bar"></div>
  </div>
  <div class="question-box">
    <h2>Q. ${question.content}</h2>
    <ol class="answer-list">
      ${tempContainer.innerHTML}
    </ol>
  </div>
  <div class="button-box">
    <button type="button" class="previous-btn">이전</button>
    <button type="button" class="next-btn">다음</button>
  </div>
  `;

  tempContainer.remove();
  return questionItem;
}
