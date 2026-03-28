const todayDate = document.getElementById("todayDate");
const today = new Date();
const options = { weekday:"long", year:"numeric", month:"long", day:"numeric" };
todayDate.textContent = today.toLocaleDateString("en-US", options);

// ===== CHECKBOX & PROGRESS =====
const checkboxes = document.querySelectorAll(".circle-check input");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

const updateProgress = () => {
  const allCards = document.querySelectorAll(".active-card, .completed-card");
  const completedCards = document.querySelectorAll(".circle-check input:checked").length;
  const total = allCards.length;
  progressText.textContent = `${completedCards}/${total}`;
  progressFill.style.width = total ? `${(completedCards / total) * 100}%` : "0%";
};

checkboxes.forEach(box => {
  box.addEventListener("change", function() {
    const parentCard = box.closest(".active-card, .completed-card");
    if (this.checked) {
      box.closest(".circle-check").classList.add("checked");
      parentCard.classList.add("completed-task");
    } else {
      box.closest(".circle-check").classList.remove("checked");
      parentCard.classList.remove("completed-task");
    }
    updateProgress();
  });
});

updateProgress();

// ===== MODAL =====
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const taskModal = document.getElementById("taskModal");

openModalBtn.addEventListener("click", () => {
  taskModal.classList.add("show");
});

closeModalBtn.addEventListener("click", () => {
  taskModal.classList.remove("show");
});

// marka banaanka la click gareeyo
taskModal.addEventListener("click", (e) => {
  if (e.target === taskModal) {
    taskModal.classList.remove("show");
  }
});

const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDesc = document.getElementById("taskDescription");
const taskContainer = document.getElementById("taskContainer");

taskForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const title = taskTitle.value.trim();
  const desc = taskDesc.value.trim();

  if (!title) {
    alert("Fadlan buuxi title-ka");
    return;
  }

  updateProgress();
});