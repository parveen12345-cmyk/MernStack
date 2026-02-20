// =====================
// Element selectors
// =====================
const themeToggle = document.getElementById("theme-toggle");
const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const notesList = document.getElementById("notes-list");
const searchInput = document.getElementById("search");
const clearCompletedBtn = document.getElementById("clear-completed");

const modal = document.getElementById("modal");
const modalYes = document.getElementById("modal-yes");
const modalNo = document.getElementById("modal-no");

let draggedItem = null;

// =====================
// Theme toggle
// =====================
themeToggle.addEventListener("click", () => {
  const html = document.documentElement;
  const isDark = html.dataset.theme === "dark";

  html.dataset.theme = isDark ? "light" : "dark";
  themeToggle.textContent = isDark ? "Dark Mode" : "Light Mode";
});

// =====================
// Add note
// =====================
noteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = noteInput.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.className = "note";
  li.draggable = true;

  li.innerHTML = `
    <span class="text">${text}</span>
    <div class="actions">
      <input type="color" class="color-picker" />
      <button class="btn btn-complete">✓</button>
      <button class="btn btn-delete">✕</button>
    </div>
  `;

  notesList.prepend(li);
  noteInput.value = "";
});

// =====================
// Event delegation (complete & delete)
// =====================
notesList.addEventListener("click", (e) => {
  const note = e.target.closest(".note");
  if (!note) return;

  if (e.target.matches(".btn-delete")) {
    note.remove();
  }

  if (e.target.matches(".btn-complete")) {
    note.classList.toggle("completed");
  }
});

// =====================
// Change note color
// =====================
notesList.addEventListener("change", (e) => {
  if (e.target.matches(".color-picker")) {
    const note = e.target.closest(".note");
    note.style.backgroundColor = e.target.value;
  }
});

// =====================
// Double-click to edit text
// =====================
notesList.addEventListener("dblclick", (e) => {
  if (!e.target.classList.contains("text")) return;

  const span = e.target;
  const oldText = span.textContent;

  const input = document.createElement("input");
  input.type = "text";
  input.value = oldText;
  input.style.width = "100%";

  span.replaceWith(input);
  input.focus();

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") input.blur();
  });

  input.addEventListener("blur", () => {
    const newSpan = document.createElement("span");
    newSpan.className = "text";
    newSpan.textContent = input.value || oldText;
    input.replaceWith(newSpan);
  });
});

// =====================
// Drag & drop reordering
// =====================
notesList.addEventListener("dragstart", (e) => {
  if (!e.target.classList.contains("note")) return;
  draggedItem = e.target;
  draggedItem.classList.add("dragging");
});

notesList.addEventListener("dragend", () => {
  if (draggedItem) draggedItem.classList.remove("dragging");
  draggedItem = null;
});

notesList.addEventListener("dragover", (e) => {
  e.preventDefault();

  const target = e.target.closest(".note");
  if (!target || target === draggedItem) return;

  const rect = target.getBoundingClientRect();
  const after = e.clientY > rect.top + rect.height / 2;

  notesList.insertBefore(
    draggedItem,
    after ? target.nextSibling : target
  );
});

// =====================
// Live search filter
// =====================
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const notes = notesList.querySelectorAll(".note");

  notes.forEach((note) => {
    const text = note.querySelector(".text").textContent.toLowerCase();
    note.style.display = text.includes(query) ? "" : "none";
  });
});

// =====================
// Modal (clear completed)
// =====================
clearCompletedBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

modalNo.addEventListener("click", () => {
  modal.style.display = "none";
});

modalYes.addEventListener("click", () => {
  const completed = notesList.querySelectorAll(".note.completed");
  completed.forEach((note) => note.remove());
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});