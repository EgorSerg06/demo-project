// server.js — сервер: Node.js + Express + MySQL
// Запуск: node server.js  →  открыть http://localhost:3000

const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Подключение к БД book_store
// В phpMyAdmin (XAMPP) по умолчанию: пользователь root, ПУСТОЙ пароль
const connection = mysql.createConnection({
    host:     'localhost',
    user:     'root',   // стандартный пользователь XAMPP
    password: '',       // по умолчанию пустой; если задавал — впиши
    database: 'book_store',
});

app.use(express.json());
app.use(express.static(__dirname)); // отдаёт index.html, main.html, css, js

// Авторизация: проверка логина и пароля в таблице users
app.post('/login', (req, res) => {
    const { login, password } = req.body;
    connection.query(
        `SELECT u.id_user, u.fio, u.login, r.role_name
         FROM users u
         JOIN roles r ON u.id_role = r.id_role
         WHERE u.login = ? AND u.password = ?`,
        [login, password],
        (err, results) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Ошибка сервера' });
            }
            if (results.length > 0) {
                res.json({ success: true, user: results[0] });
            } else {
                res.json({ success: false, message: 'Неверный логин или пароль' });
            }
        }
    );
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
