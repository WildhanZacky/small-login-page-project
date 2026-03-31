const loginForm = document.getElementById('loginForm');
const messageArea = document.getElementById('errorMessage');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const userValue = document.getElementById('username').value;
    const passValue = document.getElementById('password').value;

    if (userValue === "" && passValue === "") {
        showMessage("Please enter username and password.", "red");
    }
    else if (userValue === "admin" && passValue === "1234") {
        showMessage("Login successful!", "green");
    }
    else {
        showMessage("Invalid username or password.", "red");
    }
});

function showMessage(text, color) {
    messageArea.textContent = text;
    messageArea.style.color = color;
    messageArea.style.display = "block";

    if (color === "red") {
        messageArea.classList.add('shake-animation');
        setTimeout(() => messageArea.classList.remove('shake-animation'), 500);
    }
}