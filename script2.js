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

async function UpdateWeather() {
    const weatherDisplay = document.getElementById('weatherDisplay');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                const temp = data.current.temperature_2m;
                const code = data.current.weather_code;

                let icon = "✨";
                if (code === 0) icon = "☀️";
                else if (code >= 1 && code <= 3) icon = "🌤️";
                else if (code >= 45 && code <= 48) icon = "🌫️";
                else if (code >= 51 && code <= 67) icon = "🌧️";
                else if (code >= 71 && code <= 77) icon = "❄️";
                else if (code >= 80 && code <= 82) icon = "🌦️";
                else if (code >= 95) icon = "⛈️";

                weatherDisplay.innerHTML = `${icon} ${temp}°C`;
            } catch (error) {
                console.error("Error fetching weather data:", error);
                weatherDisplay.innerText = "Unable to load weather.";
            }
        }, (error) => {
            console.warn("Access to geolocation denied:");
            weatherDisplay.innerText = "Location access denied.";
        }
    );
    } else {
        weatherDisplay.innerText = "Geolocation is not supported by this browser.";
    }
}
UpdateWeather();


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
