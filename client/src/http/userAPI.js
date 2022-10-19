//здесь реализуем функции регистрации, авторизации и проверки токена на валидность
import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode";

export const registration = async(email, password) => {
    //ответ, который будет возвращаться с сервера (post запрос)
    //базовый url берется из системной переменной и к нему добавляем 'api...', в тело запроса передаем имейл, пароль и роль
    const { data } = await $host.post('api/user/registration', { email, password, role: 'ADMIN' });
    //когда запрос прошел, в локальное хранилище по ключу token поместим токен из тела запроса
    localStorage.setItem('token', data.token);
    //получаем токен из тела запроса и с помощью jwt_decode распарсим его
    return jwt_decode(data.token);
}

export const login = async(email, password) => {
    const { data } = await $host.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const check = async() => {
    const { data } = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

// пользователь авторизовался -> токен сохранился -> и затем при обновлении страницы 
// будет вызываться функция check -> (если токен не валидный, то пользователь будет разлогиниваться)
// -> (если валидный, пользователь попадет на главную страницу под свои аккаунтом) 
// -> перезаписываем токен и возвращаем данные о пользователе