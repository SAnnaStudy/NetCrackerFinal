//универсальная обработка ошибок
class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
    //статические ф-ии, чтобы вызывать их без создания объекта
    static badRequest(message) {
        return new ApiError(404, message);
    }
    //  внутренняя ошибка
    static internal(message) {
        return new ApiError(500, message);
    }
    //нет доступа
    static forbidden(message) {
        return new ApiError(403, message);
    }
}

module.exports = ApiError;