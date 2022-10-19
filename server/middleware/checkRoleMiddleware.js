//проверка роли пользователя, который будет добавлять рецепт
const jwt = require('jsonwebtoken');

module.exports = function(role) {
    return function (req, res, next) {
        //пропускаем, если метод options
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            //выцепить токен из headers (сначала идет тип токена, потом сам токен)
            const token = req.headers.authorization.split(' ')[1]; //Bearer-тип asfasnfkajsfnjk-токен
            if (!token) {
                return res.status(401).json({message: "Пользователь не авторизован"});
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY); //verify - проверяет токен на валидность (второй параметр - секретный ключ из переменной окружения)
            //проверска роли пользователя
            if (decoded.role !== role) {
                return res.status(403).json({message: "Нет доступа"});
            }
            req.user = decoded; //добавим данные, которые мы вытащили из токена к полю user
            next();
        } catch (e) {
            res.status(401).json({message: "Пользователь не авторизован"});
        }
    }
}




