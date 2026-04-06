function navigateTo(url) {
    console.log("Redirecting to: " + url);

    document.body.style.opacity = "0.5";
    document.body.style.transition = "0.5s";

    setTimeout(() => {
        window.location.href = url
    }, 300);
}

const gallery = [
    {
        image: "img/Ai-Mie.jpg",
    },
    {
        image: "img/Ai_Mie_.jpg"
    },
    {
        image: "img/ゞ🌺_Ai_Mie.jpg"
    },
    {
        image: "img/𖧷.jpg"
    },
];

let currentIndex = 0;

function updateTheme() {
    const data = gallery[currentIndex];

    const preview = document.getElementById('galleryPreview');
    if(preview) preview.style.backgroundImage = `url(${data.image})`;

    currentIndex = (currentIndex + 1) % gallery.length;
}

function updateClock() {
    const now = new Date();
    let h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();

    document.getElementById('hours').innerText = h < 10 ? "0"+h : h;
    document.getElementById('minutes').innerText = m < 10 ? "0"+m : m;
    document.getElementById('seconds').innerText = s < 10 ? "0"+s : s;

    let msg = h < 12 ? "Good Morning 🌅" : h < 15 ? "Good Afternoon ☀️" : h < 18 ? "Good Afternoon 🌇" : "Good Evening 🌙";
    document.getElementById('greeting').innerText = msg;
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date-display').innerText = now.toLocaleDateString('id-ID', options);
}

function navigateTo(url) {
    window.location.href = url;
}

setInterval(updateClock, 1000);
setInterval(updateTheme, 5000);
updateClock();
updateTheme();

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
