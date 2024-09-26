const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", doneTask);
tasksList.addEventListener("click", deleteTask);

// Блок функций
function addTask(event) {
  // Отменяем отправку формы
  event.preventDefault();

  // Достаем текст задачи из поля ввода
  const taskText = taskInput.value;

  // Описываем задачу в виде объекта
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  tasks.push(newTask);

  //Формируем CSS класс
  const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

  // Формируем разметку для новой задачи
  const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
              <span class="${cssClass}">${newTask.text}</span>
              <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                  <img src="./img/tick.svg" alt="Done" width="18" height="18" />
                </button>
                <button type="button" data-action="delete" class="btn-action">
                  <img src="./img/cross.svg" alt="Done" width="18" height="18" />
                </button>
              </div>
            </li>`;

  // Добавляем задачу на страницу
  tasksList.insertAdjacentHTML("beforeend", taskHTML);

  // Очищаем поле ввода и возвращаем на него фокус
  taskInput.value = "";
  taskInput.focus();

  // Проверка. Если в списке задач 1 и более элементов, скрываем блок "Список дел пуст"
  if (tasksList.children.length > 1) {
    emptyList.classList.add("none");
  }
}

function doneTask(event) {
  // Проверяем, что клик был НЕ по кнопке "задача выполнена"
  if (event.target.dataset.action !== "done") return;

  const parentNode = event.target.closest(".list-group-item");

  // Определяем ID задачи
  const id = parentNode.id;

  const task = tasks.find(function (task) {
    if (task.id == id) {
      return true;
    }
  });

  task.done = !task.done;

  console.log(task);

  const taskTitle = parentNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");
}

function deleteTask(event) {
  // Проверяем, если клик был НЕ по кнопке "удалить задачу"
  if (event.target.dataset.action !== "delete") return;

  const parentNode = event.target.closest(".list-group-item");

  // Определяем ID задачи
  const id = parentNode.id;

  // Находим индекс задачи в массиве
  // const index = tasks.findIndex((task) => task.id == id);

  // Удаляем задачу из массива с задачами
  // tasks.splice(index, 1);

  // Удаляем задачу через фильтрацию массива
  tasks = tasks.filter((task) => task.id != id);

  console.log(tasks);

  // Удаляем задачу из разметки
  parentNode.remove();

  // Проверка. Если в списке задач 1 элемент, показываем блок "Список дел пуст"
  if (tasksList.children.length === 1) {
    emptyList.classList.remove("none");
  }
}
