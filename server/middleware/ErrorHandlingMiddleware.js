const ApiError = require('../error/ApiError');

module.exports = function (err, req, res, next) {
    //если класс ошибки apiError, возвращаем ответ на клиента со статус-кодом ошибки
    if(err instanceof ApiError) {
        return res.status(err.status).json({message: err.message});
    }
    return res.status(500).json({message: "Непредвиденная ошибка!"});
}