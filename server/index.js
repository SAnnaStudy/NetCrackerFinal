//чтобы сервер мог считывать файл окружения
require('dotenv').config();
const express = require('express'); //импортируем экспресс
const sequelize = require('./db');
const models = require('./models/models.js');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index')  //роутер, который связывает все роутеры
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors()); //настройка cors, чтобы можно было отправлять запросы из браузера
app.use(express.json()) //чтобы приложение могло парсить json формат
app.use(express.static(path.resolve(__dirname, 'static'))) //для передачи изображений в папку static
app.use(fileUpload({})); //чтобы работать с файлами (для загрузки изображений)
app.use('/api', router) //первый параметр - url, по которому роутер должен обрабатываться, второй параметр - сам роутер

//Обработка ошибок(регистрируется обязательно вконце), последний Middleware
app.use(errorHandler);

//вызов функции для подключения к БД
const start = async () => {
    try {
        await sequelize.authenticate() //аутентификация для подключения к 
        await sequelize.sync(); //чтобы сверять состояние БД со схемой данных, которую опишем
        //какой порт должен прослушивать сервер
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
