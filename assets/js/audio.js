let bgm = document.getElementById("bgm");
let isPlaying = false;

// 🔥 AUTO PATH (INI KUNCI)
let basePath = location.pathname.includes("/pages/")
  ? "../assets/audio/"
  : "assets/audio/";

// ▶️ PLAY / PAUSE
function toggleMusic() {
  if (!bgm.src || bgm.src === window.location.href) {
    bgm.src = basePath + "suara-background.mp3";
  }

  if (!isPlaying) {
    bgm.volume = 0.5;
    bgm.play();
    isPlaying = true;
  } else {
    bgm.pause();
    isPlaying = false;
  }
}

// 🎵 GANTI MUSIK
function changeMusic(track) {
  bgm.pause();
  bgm.src = basePath + track;
  bgm.load();
  bgm.volume = 0.5;
  bgm.play();

  localStorage.setItem("bgm", track);
}

// 🔁 LOAD ULANG
window.onload = function () {
  const saved = localStorage.getItem("bgm");

  if (saved) {
    bgm.src = basePath + saved;
  } else {
    bgm.src = basePath + "suara-background.mp3";
  }
};

// 🔊 VOLUME
function setVolume(val) {
  bgm.volume = val;
}

// 🔇 MUTE
function muteMusic() {
  bgm.muted = !bgm.muted;
}

// 🔘 CLICK SOUND
document.addEventListener("click", function(e) {
  if (e.target.closest("button") || e.target.closest("a") || e.target.closest("#foodList div")) {
    playClick();
  }
});

// 🎧 SFX
const clickSound = new Audio(basePath + "clicksound.mp3");
const correctSound = new Audio(basePath + "sfxbenar.mp3");
const wrongSound = new Audio(basePath + "sfxsalah.mp3");
const finishSound = new Audio(basePath + "selesai.mp3");

// 🔊 FUNCTION
function playClick() {
  clickSound.currentTime = 0;
  clickSound.volume = 0.5;
  clickSound.play();
}

function playCorrect() {
  correctSound.currentTime = 0;
  correctSound.volume = 0.7;
  correctSound.play();
}

function playWrong() {
  wrongSound.currentTime = 0;
  wrongSound.volume = 0.7;
  wrongSound.play();
}

function playFinish() {
  finishSound.currentTime = 0;
  finishSound.volume = 1;
  finishSound.play();
}