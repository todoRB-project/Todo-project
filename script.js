// ===== TODAY DATE =====
const todayDate = document.getElementById("todayDate");
const today = new Date();
const options = { weekday:"long", year:"numeric", month:"long", day:"numeric" };
todayDate.textContent = today.toLocaleDateString("en-US", options);

// ===== CHECKBOX & PROGRESS =====
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const taskContainer = document.getElementById("taskContainer");

const updateProgress = () => {
  const allCards = document.querySelectorAll(".active-card, .completed-card");
  const completedCards = document.querySelectorAll(".circle-check input:checked").length;
  const total = allCards.length;
  progressText.textContent = `${completedCards}/${total}`;
  progressFill.style.width = total ? `${(completedCards / total) * 100}%` : "0%";
};

// Add existing checkboxes if any
document.querySelectorAll(".circle-check input").forEach(box => {
  box.addEventListener("change", function() {
    const parentCard = box.closest(".active-card, .completed-card");
    parentCard.classList.toggle("completed-task", this.checked);
    box.closest(".circle-check").classList.toggle("checked", this.checked);
    updateProgress();
  });
});

updateProgress();

// ===== MODAL OPEN/CLOSE =====
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const taskModal = document.getElementById("taskModal");

openModalBtn.addEventListener("click", () => taskModal.classList.add("show"));
closeModalBtn.addEventListener("click", () => taskModal.classList.remove("show"));
taskModal.addEventListener("click", e => {
  if (e.target === taskModal) taskModal.classList.remove("show");
});

// ===== FORM SAVE =====
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDesc = document.getElementById("taskDescription");

taskForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const title = taskTitle.value.trim();
  const desc = taskDesc.value.trim();

  if (!title) {
    alert("Fadlan geli title");
    return;
  }

  // Create task
  const taskCard = document.createElement("div");
  taskCard.classList.add("active-card");
  taskCard.innerHTML = `
    <div class="circle-check">
      <input type="checkbox" />
    </div>
    <div class="task-info">
      <h3>${title}</h3>
      <p>${desc}</p>
    </div>
  `;
  taskContainer.appendChild(taskCard);

  // Checkbox event for new task
  taskCard.querySelector("input").addEventListener("change", function() {
    taskCard.classList.toggle("completed-task", this.checked);
    this.closest(".circle-check").classList.toggle("checked", this.checked);
    updateProgress();
  });

  // Reset form, close modal, update progress
  taskForm.reset();
  taskModal.classList.remove("show");
  updateProgress();
});