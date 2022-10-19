const Router = require('express');
const router = new Router();
const CategoryController = require('../controllers/categoryController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), CategoryController.create); //для создания категории рецептов
router.get('/', CategoryController.getAll); //для получения всех категорий

module.exports = router;