const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Favorite} = require('../models/models');

//генерации токена
const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY, //секретный ключ
        {expiresIn: '24h'}  //опция - сколько живет токен
    )
}

//регистрация пользователя + валидация
class UserController {
    async registration(req, res, next) {
        //получаем имейл и пароль из тела запроса
        const {email, password, role} = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректная почта или пароль'));
        }
        //проверка на наличие почты в системе для исключения повторений
        const candidate = await User.findOne({where: {email}});
        if(candidate) {
            return next(ApiError.badRequest('Пользователь с такой почтой уже существует!'));
        }
        //если все условия соблюдены, хэшируем пароль и создаем нового пользователя
        const hashPassword = await bcrypt.hash(password, 5); //первый параметр - пароль пользователя, второй - сколько раз будем хэшировать
        const user = await User.create({email, role, password: hashPassword}); //создаем пользователя, передаем имейл, роль и хэшированный пароль
        const favorite = await Favorite.create({userId: user.id}); //добавим избранное и передадим id пользователя, которое можно получить из созданного объекта пользователя
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        //проверка, что пользователь с такой почтой существует в БД
        const user = await User.findOne({where: {email}});
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'));
        }
        //проверка совпадения пароля, который ввел пользователь с паролем в БД
        let comparePassword = bcrypt.compareSync(password, user.password); //сравниваем пароли с помощью compareSync, т.к они были хэшированы
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'));
        }
        //если проверка выполнена успешно, генерируем токен
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
    }

//проверка авторизован пользователь или нет (генерируется новый токен и отправляется на клиента)
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role); //обращаясь к query мы можем поучать параметры строки запроса
        return res.json({token})
    }
}

module.exports = new UserController();