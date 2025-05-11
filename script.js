// １．クイズのデータ（英語質問 × 5問 × ４択）
const quiz = [
  {
    question: "1. Which clue often reveals an AI-generated image?",
    choices: [
      "Odd reflections in eyes or glasses",
      "Perfectly even skin textures",
      "Visible camera model in EXIF data",
      "High contrast highlights"
    ],
    answer: 0
  },
  {
    question: "2. Which writing pattern hints at AI-generated text?",
    choices: [
      "Short, concise sentences",
      "Repetitive filler phrases",
      "Use of personal anecdotes",
      "Frequent hyperlinks"
    ],
    answer: 1
  },
  {
    question: "3. What metadata helps verify an article’s authenticity?",
    choices: [
      "Author name and publish date",
      "File’s byte size",
      "Font family",
      "Number of images"
    ],
    answer: 0
  },
  {
    question: "4. Which tool can assist in detecting AI-written text?",
    choices: [
      "OpenAI AI Text Classifier",
      "Google Docs Grammar Check",
      "Mendeley Reference Manager",
      "YouTube Auto-caption"
    ],
    answer: 0
  },
  {
    question: "5. A headline reads “Miracle cure—100% guaranteed!” What’s your first step?",
    choices: [
      "Share on social media",
      "Search fact-check sites like Snopes",
      "Trust because it sounds confident",
      "Ignore entire article"
    ],
    answer: 1
  }
];

let current = 0, score = 0, timeLeft = 15, timerId;

// 要素を取得
const qEl     = document.getElementById('question');
const cEl     = document.getElementById('choices');
const tEl     = document.getElementById('time');
const nextBtn = document.getElementById('next');
const quizDiv = document.getElementById('quiz');
const result  = document.getElementById('result');
const scoreT  = document.getElementById('scoreText');
const restart = document.getElementById('restart');

// タイマー開始
function startTimer() {
  timeLeft = 15;
  tEl.textContent = timeLeft;
  timerId = setInterval(() => {
    timeLeft--;
    tEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerId);
      lockChoices();
    }
  }, 1000);
}

// 問題表示
function showQuestion() {
  clearInterval(timerId);
  startTimer();
  nextBtn.disabled = true;
  const item = quiz[current];
  qEl.textContent = item.question;
  cEl.innerHTML = '';
  item.choices.forEach((ch, i) => {
    const btn = document.createElement('button');
    btn.textContent = ch;
    btn.onclick = () => selectAnswer(i);
    cEl.appendChild(btn);
  });
}

// 回答処理
function selectAnswer(i) {
  clearInterval(timerId);
  lockChoices();
  if (i === quiz[current].answer) score++;
  nextBtn.disabled = false;
}

// 選択肢をロックし色を付ける
function lockChoices() {
  Array.from(cEl.children).forEach((btn, i) => {
    btn.disabled = true;
    btn.style.background = (i === quiz[current].answer)
      ? '#c8e6c9' : '#ffcdd2';
  });
}

// 「Next」クリックで次問 or 結果表示
nextBtn.onclick = () => {
  current++;
  if (current < quiz.length) showQuestion();
  else showResult();
};

// 結果画面表示
function showResult() {
  quizDiv.classList.add('hidden');
  result.classList.remove('hidden');
  scoreT.textContent = `${score} / ${quiz.length}`;
}

// リトライ
restart.onclick = () => {
  current = 0; score = 0;
  result.classList.add('hidden');
  quizDiv.classList.remove('hidden');
  showQuestion();
};

// 最初の問題を表示
showQuestion();
