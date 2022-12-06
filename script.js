// Находим элементы на странице
const taskInput = document.querySelector('.form-control');
const form = document.querySelector('.form');
const tasksList = document.querySelector('.list-group');
const todoClear = document.querySelector('.todo__clear');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
}

tasks.forEach(task => {
    // Формрируем css class 
    const cssClass = task.done ? "list-group-item done" : "list-group-item";

    // Формируем разметку для новой задачи

    const taskHTML = `
     <li id="${task.id}" class="${cssClass}">
         <span class="note">${task.text}</span>
         <div>
             <button type="button" class="btn btn-success">Выполнено</button>
             <button type="button" class="btn btn-danger">Удалить</button>
         </div>
     </li>
     `
    // Добавляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
});

// Добавление задачи
form.addEventListener('submit', addTask)
// Удаление задачи
tasksList.addEventListener('click', deleteTask);
// Отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask);

if (tasksList.children.length > 0) {
    todoClear.classList.add('none');
}


// Функции

function addTask(event) {

    // Отменяем отправку формы
    event.preventDefault();

    // Достаем текст задачи из поля ввода
    const taskText = taskInput.value;

    // Описываем задачу в виде объекта
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    // Добавляем задачу в массив tasks

    tasks.push(newTask)


    // Формрируем css class 
    const cssClass = newTask.done ? "list-group-item done" : "list-group-item";

    // Формируем разметку для новой задачи

    const taskHTML = `
    <li id="${newTask.id}" class="${cssClass}">
        <span class="note">${newTask.text}</span>
        <div>
            <button type="button" class="btn btn-success">Выполнено</button>
            <button type="button" class="btn btn-danger">Удалить</button>
        </div>
    </li>
    `
    // Добавляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    // Очищаем поле ввода и возвращаем фокус на него
    taskInput.value = '';
    taskInput.focus();

    if (tasksList.children.length > 0) {
        todoClear.classList.add('none');
    }
    saveToLocalStorage();

}

function deleteTask(event) {

    // Проверяем если клик был НЕ по кнопке "Удалить задачу"

    if (!event.target.classList.contains('btn-danger')) return;

    // Проверяем, что клик был по кнопке удалить задачу
    const parentNode = event.target.closest('li');

    // Определяем  id задачи
    const id = Number(parentNode.id);

    // Находим индекс задачи в массиве
    const index = tasks.findIndex((task) => task.id === id);

    // Удаляем задачу из массива
    tasks.splice(index, 1);

    // Удаляем задачу из разметки 
    parentNode.remove();

    // Проверка. Если в списке задач 0 элементов, показываем блок "Список дел пуст":
    if (tasksList.children.length === 0) {
        todoClear.classList.remove('none');
    }

    saveToLocalStorage()

}

function doneTask(event) {

    // Проверяем что клил был не по кнопке "задача выполнена"
    if (!event.target.classList.contains('btn-success')) return;

    // Проверяем, что клик был по кнопке "Задача выполнена"
    const parentNode = event.target.closest('li');
    parentNode.classList.toggle('done');

    // Определяем id задачи
    const id = Number(parentNode.id);

    const task = tasks.find(task => task.id === id)

    task.done = !task.done;

    saveToLocalStorage()
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
