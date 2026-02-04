const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language"
    ],
    correctIndex: 0
  },
  {
    question: "Which CSS property is used to change text color?",
    options: ["font-style", "color", "text-color", "background-color"],
    correctIndex: 1
  },
  {
    question: "Which symbol is used for JavaScript comments?",
    options: ["&lt;!-- --&gt;", "//", "**", "##"],
    correctIndex: 1
  },
  {
    question: "Which HTML tag is used for JavaScript?",
    options: ["&lt;js&gt;", "&lt;javascript&gt;", "&lt;script&gt;", "&lt;code&gt;"],
    correctIndex: 2
  },
  {
    question: "Which keyword declares a constant in JS?",
    options: ["var", "let", "const", "static"],
    correctIndex: 2
  }
];

let currentIndex = 0;
let answers = new Array(questions.length).fill(null);

const questionContainer = document.getElementById("question-container");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const resultDiv = document.getElementById("result");

function loadQuestion() {
  const q = questions[currentIndex];

  progress.textContent = `Question ${currentIndex + 1} of ${questions.length}`;

  questionContainer.innerHTML = `
    <h3>${q.question}</h3>
    ${q.options
      .map(
        (option, index) => `
        <div class="option">
          <label>
            <input type="radio" name="option" value="${index}"
              ${answers[currentIndex] === index ? "checked" : ""}>
            ${option}
          </label>
        </div>
      `
      )
      .join("")}
  `;

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === questions.length - 1;
}

questionContainer.addEventListener("change", (e) => {
  if (e.target.name === "option") {
    answers[currentIndex] = Number(e.target.value);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion();
  }
});

submitBtn.addEventListener("click", () => {
  if (answers.includes(null)) {
    alert("Please answer all questions before submitting!");
    return;
  }

  let score = 0;

  questions.forEach((q, index) => {
    if (answers[index] === q.correctIndex) {
      score++;
    }
  });

  const percentage = Math.round((score / questions.length) * 100);

  const feedback =
    percentage >= 80
      ? "Excellent 🎉"
      : percentage >= 50
      ? "Good Job 🙂"
      : "Keep Practicing 💪";

  document.querySelector(".quiz-card").classList.add("hidden");

  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Score: ${score} / ${questions.length}</p>
    <p>Percentage: ${percentage}%</p>
    <h3>${feedback}</h3>
  `;
});

loadQuestion();
