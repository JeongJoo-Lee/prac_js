const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

app.get("/question", (req, res) => {
  res.sendFile(path.join(__dirname, "src/component/question.html"));
});

app.get("/result/[1-5]", (req, res) => {
  res.sendFile(path.join(__dirname, "src/component/result.html"));
});

app.post("/submit", (req, res) => {
  const data = req.body;
  let numberArr = [0, 0, 0, 0, 0];

  for (let i = 1; i < 11; i++) {
    let developerNum = Number(data[`question-${i}`]);
    numberArr[developerNum - 1] += 1;
  }

  let maxValue = 0;
  let maxValueIdx = 0;

  for (let i = 0; i < numberArr.length; i++) {
    if (numberArr[i] > maxValue) {
      maxValue = numberArr[i];
      maxValueIdx = i;
    }
  }

  // post 니까 마지막 응답처리를 res 로 해준다. 여기선 해당되는 결과값 페이지로 리다이렉트 시킴
  res.redirect("/result/" + (maxValueIdx + 1));
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});
