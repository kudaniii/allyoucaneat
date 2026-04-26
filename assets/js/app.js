const container = document.getElementById("foodList");

let foods = [];

// 🔥 ambil data dari JSON + localStorage
fetch("assets/data/foods.json")
  .then(res => res.json())
  .then(jsonFoods => {

    let localFoods = JSON.parse(localStorage.getItem("foods")) || [];

    foods = [...jsonFoods, ...localFoods];

    renderFoods();
  });

// 🔥 render card
function renderFoods() {
  container.innerHTML = "";

  foods.forEach((food, i) => {
    const card = document.createElement("div");

    card.className = `
      bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-lg cursor-pointer 
      hover:scale-110 hover:rotate-1 transition duration-300
    `;

    card.innerHTML = `
      <img src="${food.img}" 
      class="w-full h-32 object-cover rounded-lg mb-2">
      <h2 class="text-center font-bold text-green-700">${food.name}</h2>
    `;

    card.onclick = () => openFood(i);

    container.appendChild(card);
  });
}

// 🔥 buka modal
function openFood(i) {
  document.body.style.overflow = "hidden";

  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("modal").classList.add("flex");

  document.getElementById("modalImg").src = foods[i].img;
  document.getElementById("modalTitle").innerText = foods[i].name;
  document.getElementById("modalDesc").innerText = foods[i].desc;
}

// 🔥 tutup modal
function closeModal() {
  document.body.style.overflow = "auto";

  document.getElementById("modal").classList.add("hidden");
  document.getElementById("modal").classList.remove("flex");
}

// 🔥 klik luar modal
const modal = document.getElementById("modal");

if (modal) {
  modal.addEventListener("click", function(e){
    if (e.target.id === "modal") {
      closeModal();
    }
  });
}

// 🔊 sound klik (lebih aman)
document.addEventListener("click", function(e) {
  if (e.target.closest("button") || e.target.closest("a") || e.target.closest("#foodList div")) {
    try { playClick(); } catch(e) {}
  }
});