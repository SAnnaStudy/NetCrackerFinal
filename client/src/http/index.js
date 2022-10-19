import axios from "axios";

//создадим два экземпляра класса (первый для запросов, которые не требуют авторизации)
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL //как системную переменную укажем api сервера в файле .env
})

//во втором к каждому запросу будет автоматически подставляться header authorization и туда будет добавляться токен
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
//во втором случае необходимо добавлять автоматический токен к каждому запросу с помощью интерцептора
const authInterceptor = config => {
    //функция, которая принимает параметром config, токен получаем из глобального хранилища по ключу token
    //при авторизации будем добавлять этот token
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}

//добавляем интерцептор для запроса (будет отрабатывать перед каждым запросом
// и подставлять токен в header authorization, вместо того, как делала в postman вручную)
$authHost.interceptors.request.use(authInterceptor) 


export {
    $host,
    $authHost
}


