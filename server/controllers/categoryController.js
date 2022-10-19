const {Category} = require('../models/models');
const ApiError = require('../error/ApiError');

// require('dotenv').config()


class CategoryController {
    //создание категории
    async create(req, res) {
        const {name} = req.body; //из тела запроса извлекаем название категории
        const category = await Category.create({name}) //создаем категорию с помощью ф-ии create
        return res.json({category});
        
    }

    

    //получение категорий
    async getAll(req, res) {
        const categories = await Category.findAll(); //findAll возвращает все существующие записи в БД
        return res.json(categories);
    }
}


// const nodemailer = require('nodemailer')

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// })

// const mailOptions = {
//     from: 'snegyrocha.bai@gmail.com', 
//     to: 'snegyrocha.bai@gmail.com',
//     subject: 'Новая категория!',
//     text: 'text'
// }

// transporter.sendMail(mailOptions);

module.exports = new CategoryController();