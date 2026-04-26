let index = 0;
let score = 0;
let quiz = [];

// 🔥 ambil data dari JSON + localStorage
fetch("../assets/data/foods.json")
  .then(res => {
    if (!res.ok) throw new Error("JSON tidak ditemukan");
    return res.json();
  })
  .then(jsonFoods => {

    let localFoods = JSON.parse(localStorage.getItem("foods")) || [];
    let allFoods = [...jsonFoods, ...localFoods];

    // 🔥 kalau data kosong
    if (allFoods.length === 0) {
      alert("Data makanan kosong!");
      return;
    }

    // 🔥 generate quiz
    quiz = generateQuiz(allFoods);

    // 🔥 batasi soal max 5
    quiz = shuffleArray(quiz).slice(0, 5);

    loadQuiz();
  })
  .catch(err => {
    console.error(err);
  });


// 🔥 GENERATE QUIZ (ANTI FREEZE)
function generateQuiz(foods) {
  return foods.map(food => {

    let options = [food.name];

    // 🔥 kalau data kurang dari 4 → tidak pakai while
    let shuffledFoods = shuffleArray([...foods]);

    for (let f of shuffledFoods) {
      if (options.length >= 4) break;

      if (!options.includes(f.name)) {
        options.push(f.name);
      }
    }

    let correctAnswer = food.name;

    options = shuffleArray(options);

    return {
      question: "Ini makanan apa?",
      img: food.img,
      options: options,
      answer: options.findIndex(opt =>
        opt.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
      )
    };
  });
}


// 🔥 SHUFFLE AMAN
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}


// 🔥 LOAD SOAL
function loadQuiz() {
  const q = quiz[index];

  if (!q) return;

  document.getElementById("quizImg").src = q.img;
  document.getElementById("question").innerText = q.question;

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.className = "block w-full p-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-105 transition";
    btn.onclick = () => checkAnswer(i);
    answers.appendChild(btn);
  });
}


// 🔥 CEK JAWABAN
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


// 🔥 HASIL AKHIR
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

      <h1 class="text-3xl font-bold mb-2">🎉 Quiz Selesai!</h1>
      <p class="text-xl mb-2">${message}</p>
      <p class="mb-6 text-lg">Score kamu: ${score}</p>

      <button id="btnRestart" 
        class="bg-white text-green-600 px-6 py-2 rounded-full mb-3">
        🔁 Ulangi Quiz
      </button>

      <button id="btnHome" 
        class="bg-black text-white px-6 py-2 rounded-full">
        🏠 Menu Utama
      </button>
    </div>
  `;

  document.getElementById("btnRestart").onclick = restartQuiz;
  document.getElementById("btnHome").onclick = goHome;
}


// 🔁 RESTART
function restartQuiz() {
  location.reload();
}

// 🏠 HOME
function goHome() {
  window.location.href = "../index.html";
}