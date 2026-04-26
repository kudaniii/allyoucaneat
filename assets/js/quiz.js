let index = 0;
let score = 0;
let quiz = [];

// 🔥 ambil data dari JSON + localStorage
fetch("../assets/data/foods.json")
  .then(res => res.json())
  .then(jsonFoods => {

    let localFoods = JSON.parse(localStorage.getItem("foods")) || [];

    let allFoods = [...jsonFoods, ...localFoods];

    // 🔥 generate soal dari makanan
    quiz = generateQuiz(allFoods).slice(0, 5); // ambil 5 soal saja

    loadQuiz();
  });

// 🔥 buat soal otomatis
function generateQuiz(foods) {
  return foods.map(food => {
    let options = [food.name];

    while (options.length < 4) {
      let random = foods[Math.floor(Math.random() * foods.length)].name;
      if (!options.includes(random)) {
        options.push(random);
      }
    }

    // simpan jawaban sebelum diacak
    let correctAnswer = food.name;

    // acak
    options.sort(() => Math.random() - 0.5);

    return {
      question: "Ini makanan apa?",
      img: food.img,
      options: options,
      answer: options.indexOf(correctAnswer) // 🔥 pakai ini
    };
  });
}

// 🔥 load soal
function loadQuiz() {
  const q = quiz[index];

  document.getElementById("quizImg").src = q.img;
  document.getElementById("question").innerText = q.question;

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.className = "block w-full p-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-105 hover:shadow-lg transition duration-200";
    btn.onclick = () => checkAnswer(i);
    answers.appendChild(btn);
  });
}

// 🔥 cek jawaban
function checkAnswer(i) {
  try { playClick(); } catch(e) {}

  if (i === quiz[index].answer) {
    score++;
    try { playCorrect(); } catch(e) {}
  } else {
    try { playWrong(); } catch(e) {}
  }

  document.getElementById("score").innerText = score;

  index++;

  if (index < quiz.length) {
    loadQuiz();
  } else {
    showResult();
  }
}

// 🔥 hasil akhir
function showResult() {
  try { playFinish(); } catch(e) {}

  let message = "";
  
  if (score === quiz.length) {
    message = "🔥 Sempurna!";
  } else if (score >= quiz.length / 2) {
    message = "👍 Lumayan!";
  } else {
    message = "😅 Coba lagi!";
  }

  document.body.innerHTML = `
    <div class="flex flex-col items-center justify-center h-screen 
    bg-gradient-to-br from-yellow-300 via-orange-400 to-red-400 text-white">

      <h1 class="text-3xl font-bold mb-2 animate-bounce">🎉 Quiz Selesai!</h1>
      <p class="text-xl mb-2">${message}</p>
      <p class="mb-6 text-lg">Score kamu: ${score}</p>

      <button id="btnRestart" 
        class="bg-white text-green-600 px-6 py-2 rounded-full shadow mb-3 hover:scale-110 transition">
        🔁 Ulangi Quiz
      </button>

      <button id="btnHome" 
        class="bg-black text-white px-6 py-2 rounded-full shadow hover:scale-110 transition">
        🏠 Menu Utama
      </button>
    </div>
  `;

  document.getElementById("btnRestart").onclick = restartQuiz;
  document.getElementById("btnHome").onclick = goHome;
}

// 🔁 ulangi
function restartQuiz() {
  try { playClick(); } catch(e) {}
  location.reload();
}

// 🏠 kembali
function goHome() {
  try { playClick(); } catch(e) {}
  window.location.href = "../index.html";
}