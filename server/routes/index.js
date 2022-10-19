const Router = require('express');
const router = new Router();
const recipeRouter = require('./recipeRouter');
const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/recipe', recipeRouter)

module.exports = router;