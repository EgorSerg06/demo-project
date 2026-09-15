// app.js — логика авторизации
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // не перезагружать страницу

    const login = document.getElementById('login').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('errorMsg');

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password })
        });
        const data = await response.json();

        if (data.success) {
            sessionStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'main.html'; // переход на главную
        } else {
            errorMsg.textContent = data.message;
        }
    } catch (err) {
        errorMsg.textContent = 'Сервер не отвечает. Запущен ли node server.js?';
    }
});
