import { makeAutoObservable } from "mobx";

export default class EntityRecipes {
    constructor() {
        this._categories = []
        this._recipes = []
        this._selectedCategory = {} //для хранения выбранной категории
        this._page = 1 //поле, которое отвечает за текущую страницу (по умолчанию первая страница)
        this._totalCount = 0 //общее количество рецептов, которое доступно по данному запросу
        this._limit = 6 //количество рецептов на одной странице (по умолчанию 3)
        makeAutoObservable(this)
    }

    //функции для изменения состояния
    setCategories(categories) {
        this._categories = categories
    }
    setRecipes(recipes) {
            this._recipes = recipes
        }
        //ф-ия при нажатии на одну из категорий, выделить ее
    setSelectedCategory(category) {
        this.setPage(1) //чтобы при смене категории страницы с рецептами начинались с первой
        this._selectedCategory = category
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }

    //добавляем геттеры, чтобы получать переменные из состояния (вызывются, если переменная будет изменена)
    get categories() {
        return this._categories
    }
    get recipes() {
        return this._recipes
    }
    get selectedCategory() {
        return this._selectedCategory
    }
    get page() {
        return this._page
    }
    get totalCount() {
        return this._totalCount
    }
    get limit() {
        return this._limit
    }
}