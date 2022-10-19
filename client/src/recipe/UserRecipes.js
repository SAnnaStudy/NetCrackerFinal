import {makeAutoObservable} from "mobx";

export default class UserRecipes {
    constructor() {
        this._isAuth = true  
        this._user = {}
        makeAutoObservable(this)
    }

    //функции для изменения состояния
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    //добавляем геттеры, чтобы получать переменные из состояния (вызывются, если переменная будет изменена)
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}