const uuid = require('uuid');
const path = require('path');
const { Recipe, RecipeIngredients, RecipeDescription } = require('../models/models');
const ApiError = require('../error/ApiError');

class RecipeController {
    //создание рецепта
    async create(req, res, next) {
            try {
                let { name, time, porcions, categoryId, description, ingredients } = req.body; //получаем данные из тела запроса
                const { img } = req.files; //получаем изображение
                let fileName = uuid.v4() + ".jpg"; //сгенироравать имя файла
                img.mv(path.resolve(__dirname, '..', 'static', fileName)); //ф-ия resolve адаптирует указанный путь к операционной системе 
                //(путь до текущей папки с контроллером, .. - чтобы вернуться на дерикторию назад)
                const recipe = await Recipe.create({ name, time, porcions, categoryId, img: fileName });

                //добавляем описание приготовления к рецепту
                if (description) {
                    description = JSON.parse(description);
                    description.forEach(i =>
                        RecipeDescription.create({
                            name: i.name,
                            recipeId: recipe.id
                        })
                    )
                };

                //добавляем ингредиенты к рецепту
                if (ingredients) {
                    ingredients = JSON.parse(ingredients); //parse - т.к данные приходят в виде строки
                    //проходимся по массиву с ингредиентами
                    ingredients.forEach(i =>
                        RecipeIngredients.create({
                            name: i.name, //название
                            quantity: i.quantity, //количество 
                            recipeId: recipe.id
                        })
                    )
                };

                return res.json(recipe);
            } catch (e) {
                next(ApiError.badRequest(e.message));
            }

        }
        //получение всех рецептов
    async getAll(req, res) {
            let { categoryId, limit, page } = req.query; //получаем категорию рецепта из строки запроса (добавляем кол-во отображаемых рецептов и страницы)
            page = page || 1; //по умолчанию первая страница и 9 рецептов
            limit = limit || 6;
            let offset = page * limit - limit; //отступ - чтобы пропустить первые 9 рецептов при переходе на вторую страницу и тд
            let recipes;
            //если нет категории, возвращаем все рецепты
            if (!categoryId) {
                recipes = await Recipe.findAndCountAll({ limit, offset }); //findAndCountAll(пагинация) - разделение массива данных, имеющихся на сайте, на отдельные страницы
            } else {
                //если есть категория, делаем фильтрацию по категории
                recipes = await Recipe.findAndCountAll({ where: { categoryId }, limit, offset });
            };
            return res.json(recipes); //возвращаем массив рецептов

        }
        //получение конкретного рецепта
    async getOne(req, res) {
        const { id } = req.params; //получаем id рецепта (этот параметр указан в recipeRouter.js)
        const recipe = await Recipe.findOne(
            //условие, по которому ищем рецепт
            {
                where: { id },
                include: [{ model: RecipeDescription, as: 'description' }, { model: RecipeIngredients, as: 'ingredients' }] //model - модель характеристик, as - название поля, которое будет в этом объекте 
            },
        )
        return res.json(recipe);
    }

}

module.exports = new RecipeController();