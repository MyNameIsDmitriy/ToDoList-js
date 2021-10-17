const addTaskElement = document.getElementById('add-task');
const descriptionTaskInput = document.getElementById('description-task');
const taskWrapper = document.querySelector('.task-wrapper')

let tasks = [];
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let taskItemElements = [];

function Task(description) {
  this.description = description;
  this.completed = false;
}

const TaskCreateComponent = (task, index) => {
  return `
    <div class="task-item ${task.completed ? 'checked': ''}">
      <div class="description">${task.description}</div>
      <div class="buttons">
        <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked': ''}>
        <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
      </div>
    </div>
  `
}

const sortTasks = () => {
  const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
  const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
  tasks = [...activeTasks,...completedTasks];
}

const fillHtmlList = () => {
  taskWrapper.innerHTML = "";
  if(tasks.length > 0) {
    sortTasks();
    tasks.forEach((item, index) => {
      taskWrapper.innerHTML += TaskCreateComponent(item, index);
    });
    taskItemElements = document.querySelectorAll('.task-item');
  }
}

fillHtmlList();

const updateLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  if(tasks[index].completed) {
    taskItemElements[index].classList.add('checked');
  } else {
    taskItemElements[index].classList.remove('checked');
  }
  updateLocalStorage();
  fillHtmlList();
}

addTaskElement.addEventListener('click', () => {
  tasks.push(new Task(descriptionTaskInput.value));
  updateLocalStorage();
  fillHtmlList();
  descriptionTaskInput.value = '';
})

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateLocalStorage();
  fillHtmlList();
}
