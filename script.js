let tasks = [];

function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value.trim()) return;

  tasks.push({
    id: Date.now(),
    text: input.value,
    done: false,
    priority: 1
  });

  input.value = "";
  render();
}

function removeTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

function toggleDone(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  render();
}

function updatePriority(id, value) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, priority: Number(value) } : t
  );
  render();
}

function render() {
  const list = document.getElementById("list");
  const search = document.getElementById("search").value.toLowerCase();
  const status = document.getElementById("statusFilter").value;
  const sort = document.getElementById("sortDir").value;

  list.innerHTML = "";

  let filtered = tasks
    .filter(t => t.text.toLowerCase().includes(search))
    .filter(t =>
      status === "all" ? true :
      status === "done" ? t.done :
      !t.done
    )
    .sort((a, b) =>
      sort === "asc" ? a.priority - b.priority : b.priority - a.priority
    );

  filtered.forEach(t => {
    const el = document.createElement("div");
    el.className = "task";

    el.innerHTML = `
      <div>
        <input type="checkbox" ${t.done ? "checked" : ""} onclick="toggleDone(${t.id})">
        <span class="${t.done ? "done" : ""}">${t.text}</span>
      </div>

      <div>
        <input type="number" min="1" max="10" value="${t.priority}"
               onchange="updatePriority(${t.id}, this.value)" style="width: 50px;">
        <button onclick="removeTask(${t.id})">X</button>
      </div>
    `;

    list.appendChild(el);
  });
}