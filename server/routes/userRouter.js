const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration); //регистрация пользователя
router.post('/login', userController.login); //авторизация
router.get('/auth', authMiddleware, userController.check); //для проверки, авторизован пользователь или нет

module.exports = router;