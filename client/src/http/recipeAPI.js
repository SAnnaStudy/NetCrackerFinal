//здесь реализуем функции регистрации, авторизации и проверки токена на валидность
import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode";
import { useState } from 'react';

//создание категории рецепта (для авторизованных пользователей)
export const createCategory = async(category) => {
    //ответ, который будет возвращаться с сервера (post запрос)
    //базовый url берется из системной переменной и к нему добавляем 'api...', в тело запроса передаем категорию рецептов
    const { data } = await $authHost.post('api/category', category);
    //возвращаем то, что получили в ответе
    return data;
}

//получение категорий рецептов (get запрос)
export const fetchCategories = async() => {
    const { data } = await $host.get('api/category');
    return data;
}

//создание рецепта (для авторизованных пользователей)
export const createRecipe = async(recipe) => {
    //ответ, который будет возвращаться с сервера (post запрос)
    //базовый url берется из системной переменной и к нему добавляем 'api...', в тело запроса передаем категорию рецептов
    const { data } = await $authHost.post('api/recipe', recipe);
    //возвращаем то, что получили в ответе
    return data;
}

//получение всепх рецептов (get запрос)
export const fetchRecipes = async(categoryId, page, limit = 5) => {
    const { data } = await $host.get('api/recipe', {
        params: {
            categoryId,
            page,
            limit //они автоматически подставятся в строку запроса, если переменная не пустая
        }
    });
    return data;
}

//получение одного рецепта по id (get запрос)
export const fetchOneRecipe = async(id) => {
    const { data } = await $host.get('api/recipe/' + id);
    return data;
}