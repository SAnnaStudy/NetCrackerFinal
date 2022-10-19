const sequelize = require('../db.js');
const { DataTypes } = require('sequelize'); //чтобы указыввать типы переменных

//модель пользователя
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //числовой тип, с личным ключом, который будет автокриментироваться
    email: { type: DataTypes.STRING, unique: true }, //строковый тип с уникальным значением
    password: { type: DataTypes.STRING }, //строковый тип
    role: { type: DataTypes.STRING, defaultValue: "USER" } //строковый тип, по умолчанию user
})

//модель избранного
const Favorite = sequelize.define('favorite', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //числовой тип, с личным ключом, который будет автокриментироваться
})

//модель избранного рецепта
const FavoriteRecipe = sequelize.define('favorite_recipe', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //числовой тип, с личным ключом, который будет автокриментироваться
})

//сущность рецепта
const Recipe = sequelize.define('recipe', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //числовой тип, с личным ключом, который будет автокриментироваться
    name: { type: DataTypes.STRING, unique: true, allowNull: false }, //строковый тип с уникальным значением
    time: { type: DataTypes.STRING, allowNull: false }, //время приготовления
    porcions: { type: DataTypes.INTEGER, allowNull: false }, //количество порций
    rating: { type: DataTypes.INTEGER, defaultValue: 0 }, //рeйтинг рецепта
    img: { type: DataTypes.STRING, allowNull: false } //изображение
})

//категория рецепта 
const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //числовой тип, с личным ключом, который будет автокриментироваться
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

//рейтинг 
const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false },
})

//описание рецепта (приготовление по шагам)
const RecipeDescription = sequelize.define('recipe_description', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //числовой тип, с личным ключом, который будет автокриментироваться
    name: { type: DataTypes.STRING, allowNull: false }, //описание этапа приготовления рецепта
})

//описание рецепта (ИНГРЕДИЕНТЫ и их количество)
const RecipeIngredients = sequelize.define('recipe_ingredients', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //числовой тип, с личным ключом, который будет автокриментироваться
    name: { type: DataTypes.STRING, allowNull: false }, //название ингредиента
    quantity: { type: DataTypes.STRING, allowNull: true }, //количество ингредиентов (необязательный параметр)
})


//описание связе моделей

User.hasOne(Favorite) //связь пользователя и избранного 1 к 1
Favorite.belongsTo(User) //вкладка с избранными рецептами принадлежит пользователю

User.hasMany(Rating) //один пользователь может оставлять несколько оценок
Rating.belongsTo(User)

Favorite.hasMany(FavoriteRecipe) //избранное для многих рецептов
FavoriteRecipe.belongsTo(Favorite)

Category.hasMany(Recipe) //категория (первое, второе, закуски и тд) для многих рецептов
Recipe.belongsTo(Category)

Recipe.hasMany(Rating) //рецепт может иметь много оценок от пользователей
Rating.belongsTo(Recipe)

Recipe.hasMany(FavoriteRecipe) //рецепт может быть в избранном у многих пользователей
FavoriteRecipe.belongsTo(Recipe)

Recipe.hasMany(RecipeDescription, { as: 'description' }) //одна запись рецепта в бд содержит много записей с шагами приготовления блюда
RecipeDescription.belongsTo(Recipe)

Recipe.hasMany(RecipeIngredients, { as: 'ingredients' }) //одна запись рецепта в бд содержит много записей с ингредиентами (указали название поля, которое будет у массива ингредиентов)
RecipeIngredients.belongsTo(Recipe)





module.exports = {
    User,
    Favorite,
    FavoriteRecipe,
    Recipe,
    Category,
    Rating,
    RecipeDescription,
    RecipeIngredients
}