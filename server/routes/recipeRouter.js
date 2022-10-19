const Router = require('express');
const router = new Router();
const recipeController = require('../controllers/recipeController');

router.post('/', recipeController.create); //создание рецепта
router.get('/', recipeController.getAll); //получение рецепта
router.get('/:id', recipeController.getOne); //чтобы получить отдельный конкретный рецепт, после того, как перешли на страницу с подробной информацией
module.exports = router;