const todayDate = document.getElementById("todayDate");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const taskModal = document.getElementById("taskModal");

const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDesc = document.getElementById("taskDescription");
const taskSearch = document.getElementById("taskSearch");

const activeTasks = document.getElementById("activeTasks");
const completedTasks = document.getElementById("completedTasks");
const activeHeading = document.getElementById("activeHeading");
const completedHeading = document.getElementById("completedHeading");

const today = new Date();
const options = { weekday: "long", month: "short", day: "numeric" };
todayDate.textContent = today.toLocaleDateString("en-US", options);

function updateProgress() {
  const allCards = document.querySelectorAll(".active-card, .completed-card");
  const completedCards = document.querySelectorAll(
    "#completedTasks .completed-card"
  );

  const total = allCards.length;
  const done = completedCards.length;

  progressText.textContent = `${done}/${total}`;
  progressFill.style.width = total ? `${(done / total) * 100}%` : "0%";
}

function updateSectionCounts() {
  const activeCount = activeTasks.querySelectorAll(".active-card").length;
  const completedCount =
    completedTasks.querySelectorAll(".completed-card").length;

  activeHeading.textContent = `ACTIVE (${activeCount})`;
  completedHeading.textContent = `COMPLETED (${completedCount})`;
}

function updateCardState(card, isCompleted) {
  const checkbox = card.querySelector(".circle-check input");
  const title = card.querySelector(".active-title, .completed-title");
  const checkWrap = card.querySelector(".circle-check");

  if (isCompleted) {
    card.classList.remove("active-card");
    card.classList.add("completed-card");

    if (title) {
      title.classList.remove("active-title");
      title.classList.add("completed-title");
    }

    if (checkbox) checkbox.checked = true;

    if (
      checkWrap &&
      !checkWrap.classList.contains("completed-yellow") &&
      !checkWrap.classList.contains("completed-green")
    ) {
      checkWrap.classList.add("completed-green");
    }

    completedTasks.appendChild(card);
  } else {
    card.classList.remove("completed-card");
    card.classList.add("active-card");

    if (title) {
      title.classList.remove("completed-title");
      title.classList.add("active-title");
    }

    if (checkbox) checkbox.checked = false;

    if (checkWrap) {
      checkWrap.classList.remove("completed-yellow", "completed-green");
    }

    activeTasks.appendChild(card);
  }

  updateSectionCounts();
  updateProgress();
}

function attachCheckboxEvents(card) {
  const checkbox = card.querySelector(".circle-check input");
  if (!checkbox) return;

  checkbox.addEventListener("change", function () {
    updateCardState(card, this.checked);
  });
}

function attachDeleteEvents(card) {
  const deleteBtn = card.querySelector(".delete-btn");
  if (!deleteBtn) return;

  deleteBtn.addEventListener("click", function () {
    card.remove();
    updateSectionCounts();
    updateProgress();
  });
}

function attachCardEvents(card) {
  attachCheckboxEvents(card);
  attachDeleteEvents(card);
}

function createTaskCard(title, desc) {
  const card = document.createElement("section");
  card.className = "active-card";

  card.innerHTML = `
    <div class="active-header">
      <label class="circle-check">
        <input type="checkbox" />
        <span></span>
      </label>

      <div class="active-content">
        <div class="card-top-row">
          <h2 class="active-title"></h2>

          <div class="card-actions">
            <button class="delete-btn" type="button" title="Delete">
              <i class="fa-solid fa-trash"></i>
            </button>
            <button class="menu-btn" type="button">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </div>
        </div>

        <p class="active-info"></p>

        <div class="active-tags">
          <span class="tag-work"><i class="fa-solid fa-briefcase"></i> new</span>
        </div>
      </div>
    </div>
  `;

  card.querySelector(".active-title").textContent = title;
  card.querySelector(".active-info").textContent = desc || "No description";

  attachCardEvents(card);
  return card;
}

openModalBtn.addEventListener("click", () => {
  taskModal.classList.add("show");
  taskTitle.focus();
});

closeModalBtn.addEventListener("click", () => {
  taskModal.classList.remove("show");
});

taskModal.addEventListener("click", (e) => {
  if (e.target === taskModal) {
    taskModal.classList.remove("show");
  }
});

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = taskTitle.value.trim();
  const desc = taskDesc.value.trim();

  if (!title) {
    alert("Please enter task title");
    taskTitle.focus();
    return;
  }

  const newCard = createTaskCard(title, desc);
  activeTasks.appendChild(newCard);

  taskForm.reset();
  taskModal.classList.remove("show");

  updateSectionCounts();
  updateProgress();
});

taskSearch.addEventListener("input", function () {
  const value = this.value.trim().toLowerCase();
  const allCards = document.querySelectorAll(".active-card, .completed-card");

  allCards.forEach((card) => {
    const title =
      card
        .querySelector(".active-title, .completed-title")
        ?.textContent.toLowerCase() || "";
    const desc =
      card.querySelector(".active-info")?.textContent.toLowerCase() || "";
    const matches = title.includes(value) || desc.includes(value);
    card.style.display = matches ? "" : "none";
  });
});

document.querySelectorAll(".active-card, .completed-card").forEach((card) => {
  attachCardEvents(card);
});

updateSectionCounts();
updateProgress();
