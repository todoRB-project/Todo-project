const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const taskModal = document.getElementById("taskModal");

openModalBtn.addEventListener("click", () => {
  taskModal.classList.add("show");
});

closeModalBtn.addEventListener("click", () => {
  taskModal.classList.remove("show");
});

taskModal.addEventListener("click", (e) => {
  if (e.target === taskModal) {
    taskModal.classList.remove("show");
  }
});