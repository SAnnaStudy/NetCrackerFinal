import AdminPanel from "./pages/AdminPanel"
import Auth from "./pages/Auth"
import Main from "./pages/Main"
import RecipePage from "./pages/RecipePage"
import Recipes from "./pages/Recipes"
import SearchByIngredients from "./pages/SearchByIngredients"
import SearchByName from "./pages/SearchByName"
import UserPanel from "./pages/UserPanel"
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, RECIPES_ROUTE, RECIPE_ROUTE, REGISTRATION_ROUTE, SEARCHBYINGREDIENTS_ROUTE, SEARCHBYNAME_ROUTE, USER_ROUTE } from "./utils/const"

//список маршрутов только для тех страниц, к которым имеет доступ авторизованный пользователь
export const authRoutes = [
    {
        pathPage: USER_ROUTE,
        ComponentPage: UserPanel  //страница для добавления рецепта  //страница для добавления рецепта
    },
    {
        pathPage: ADMIN_ROUTE,
        ComponentPage: AdminPanel  //страница для добавления рецепта
    }
]

//список маршрутов только для тех страниц, к которым все имеют доступ
export const publicRoutes = [
    {
        pathPage: LOGIN_ROUTE,
        ComponentPage: Auth
    },
    {
        pathPage: REGISTRATION_ROUTE,
        ComponentPage: Auth  
    },
    {
        pathPage: RECIPES_ROUTE,
        ComponentPage: Recipes  //все рецепты
    },
    {
        pathPage: RECIPE_ROUTE + '/:id',
        ComponentPage: RecipePage  //страница одного рецепта
    },{
        pathPage: MAIN_ROUTE,
        ComponentPage: Main  //главная страница
    },
    {
        pathPage: SEARCHBYINGREDIENTS_ROUTE,
        ComponentPage: SearchByIngredients  //страница с поиском по рецептам
    },
    {
        pathPage: SEARCHBYNAME_ROUTE,
        ComponentPage: SearchByName  //страница с поиском по названию рецепта
    }
]