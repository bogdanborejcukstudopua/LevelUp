const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/Post');
const app = express();

// --- НАЛАШТУВАННЯ БАЗИ ДАНИХ ---
// Залиште тут ваше актуальне посилання на MongoDB Atlas
const dbURI = 'mongodb+srv://admin:admin123@levelup-cluster.kc6kr8j.mongodb.net/levelup-db?appName=LevelUp-Cluster';

mongoose.connect(dbURI)
    .then((result) => console.log('З\'єднання з базою даних встановлено.'))
    .catch((err) => console.log('Помилка підключення до бази даних:', err));

// --- НАЛАШТУВАННЯ СЕРВЕРА ---
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// --- МАРШРУТИ ---

// Головна сторінка
app.get('/', (req, res) => {
    Post.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'LevelUp - Головна сторінка', news: result });
        })
        .catch((err) => {
            console.error('Помилка отримання даних:', err);
        });
});

// Сторінка створення новини
app.get('/create', (req, res) => {
    res.render('create', { title: 'Створення новини' });
});

// Обробка POST-запиту на додавання новини
app.post('/add-post', (req, res) => {
    const post = new Post(req.body);

    post.save()
        .then((result) => {
            console.log('Новий запис успішно додано до колекції.');
            res.redirect('/');
        })
        .catch((err) => {
            console.error('Помилка збереження даних:', err);
        });
});

// --- ЗАПУСК СЕРВЕРА ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено. Порт: ${PORT}`);
});