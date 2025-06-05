const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

addBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  if (task) {
    tasks.push({ text: task, done: false });
    updateTasks();
    taskInput.value = '';
  }
});

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.done ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggleDone(${index})">${task.text}</span>
      <div>
        <button onclick="toggleDone(${index})">${task.done ? '↩️' : '✅'}</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>`;
    taskList.appendChild(li);
  });
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  updateTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateTasks();
}

function updateTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}
