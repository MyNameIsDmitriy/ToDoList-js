const addTask = document.getElementById('add-task');
const deskTask = document.getElementById('description-task');
const taskWrap = document.querySelector('.task-wrapper')

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let taskItemElements = [];

function Task(description) {
  this.description = description;
  this.completed = false;
}

const createTemplate = (task, index) => {
  return `
    <div class="task-item ${task.completed ? 'checked': ''}">
      <div class="description">${task.description}</div>
      <div class="buttons">
        <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked': ''}>
        <button class="btn-delete">Delete</button>
      </div>
    </div>
  `
}

const fillHtmlList = () => {
  taskWrap.innerHTML = "";
  if(tasks.length > 0) {
    tasks.forEach((item, index) => {
      taskWrap.innerHTML += createTemplate(item, index);
    });
    taskItemElements = document.querySelectorAll('.task-item');
  }
}

fillHtmlList();

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  if(tasks[index].completed) {
    taskItemElements[index].classList.add('checked');
  } else {
    taskItemElements[index].classList.remove('checked');
  }
  updateLocal();
  fillHtmlList();
}

addTask.addEventListener('click', () => {
  tasks.push(new Task(deskTask.value));
  updateLocal();
  fillHtmlList();
  deskTask.value = '';
})
