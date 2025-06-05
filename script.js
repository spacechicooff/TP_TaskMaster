const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

function getListFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      } else {
        console.warn(`La valeur associée à la clé "${key}" n'est pas un tableau.`);
        return [];
      }
    } catch (e) {
      console.error(`Erreur lors de l'analyse des données JSON pour la clé "${key}" :`, e);
      return [];
    }
  } else {
    return [];
  }
}


function storeList() {
  window.localStorage.taskmaster = taskList.innerText;
}
window.addEventListener("load",getListFromLocalStorage)

addBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  if (task) {
    tasks.push({ text: task, done: false });
    updateTasks();
    taskInput.value = '';
    storeList();
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
  storeList();
}

function updateTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}
