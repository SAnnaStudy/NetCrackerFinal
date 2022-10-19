import React, { useContext, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategoryBar from '../componentsApplication/MainConteiner/RecipesByCategory/CategoryBar';
import RecipeList from '../componentsApplication/MainConteiner/RecipesByCategory/RecipeList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchCategories, fetchRecipes } from '../http/recipeAPI';
import Pages from '../componentsApplication/Pages';
import s from './stylePages/Recipes.module.css';


const Recipes = observer(() => {
    //получаем сущность рецепта с помощью хука useContext
    const { recipe } = useContext(Context);

    //единыжды при открытии страницы подгружать рецепты, массив зависимостей вторым параметром передаем пустым
    useEffect(() => {
        //в случае успешного запроса у recipe вызываем метод, передаем в него то, что вернулось в запросе
        fetchCategories().then(data => recipe.setCategories(data))
        //(categoryId, текущая сраница, ограничение по кол-ву товара на стр)
        fetchRecipes(null, 1, 6).then(data => {
            recipe.setRecipes(data.rows) //получение всех товаров
            recipe.setTotalCount(data.count)//узнаем, сколько товаров мы получили, чтобы потом посчитать количество страниц
        })
    }, [])

    //переключение страниц (вторым параметром принимает массив зависимостей)
    //если в этот массив зависимостей передать номер страницы, то ф-ия, которая идет первым параметром
    //будет вызываться каждый раз, когда страница будет изменена
    useEffect(() => {
        fetchRecipes(recipe.selectedCategory.id, recipe.page, 6).then(data => {
            recipe.setRecipes(data.rows) //получение всех рецептов
            recipe.setTotalCount(data.count)//узнаем, сколько рецептов мы получили, чтобы потом посчитать количество страниц
        })
    }, [recipe.page, recipe.selectedCategory, recipe.page])




    return (
        <div className={s.recipesPage}>
            <Container className={s.recipesPage_Container}>
                <Row>
                    <Col md={3}>
                        <CategoryBar />
                    </Col>
                    <Col md={9} >
                        <RecipeList />
                        <Pages />
                    </Col>
                </Row>
            </Container>
        </div>
    )
});

export default Recipes;