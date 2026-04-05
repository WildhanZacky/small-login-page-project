function navigateTo(url) {
    console.log("Redirecting to: " + url);

    document.body.style.opacity = "0.5";
    document.body.style.transition = "0.5s";

    setTimeout(() => {
        window.location.href = url
    }, 300);
}

function updateClock() {
    const now = new Date();

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    document.getElementById('hours').textContent = h;
    document.getElementById('minutes').textContent = m;
    document.getElementById('seconds').textContent = s;

    let message = "";
    if (h >= 5 && h < 12) message = "Good Morning 🌅"
    else if (h >= 12 && h < 15) message = "Good Afternoon ☀️"
    else if (h >= 15 && h < 18) message = "Good Afternoon 🌇"
    else message = "Good Evening 🌙"

    document.getElementById('greeting').innerText = message;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date-display').innerText = now.toLocaleDateString('id-ID', options);
}

setInterval(updateClock, 1000);

updateClock();

const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

function renderTodo(text) {
    const li = document.createElement('li');
    li.innerHTML = `
    <span>${text}</span>
    <button class="delete-btn">&times;</button>
    `;

    li.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    li.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        saveData();
    });

    todoList.appendChild(li);
}

addBtn.addEventListener('click', () => {
    if (input.value.trim() !== "") {
        renderTodo(input.value);
        saveData();
        input.value = "";
    }
});

function saveData() {
    const tasks = [];
    document.querySelectorAll('li span:first-child').forEach(span => {
        tasks.push(span.innerText)
    });
    localStorage.setItem('myTodoList', JSON.stringify(tasks));
}

function loadData() {
    const savedtasks = JSON.parse(localStorage.getItem('myTodoList'));
    if (savedtasks) {
        savedtasks.forEach(task => renderTodo(task));
    }
}

loadData();
