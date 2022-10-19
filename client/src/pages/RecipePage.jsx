import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { RECIPES_ROUTE } from '../utils/const';
import { useParams } from 'react-router-dom'; //когда будем отправлять запрос на сервер, нужно знать id рецепта:
import { fetchOneRecipe } from '../http/recipeAPI';
import s from './stylePages/RecipePage.module.css';

const RecipePage = () => {
    const [recipe, setRecipe] = useState({ description: [], ingredients: [] });
    const { id } = useParams();

    //каждый раз при открытии страницы единыжды подгружать информацию с рецептом
    useEffect(() => {
        //делаем запрос по id, после передаем результат этого запроса в setRecipe
        fetchOneRecipe(id).then(data => setRecipe(data));
    }, [])

    return (
        <div className={s.recipePage}>
            <div className={s.recipePageTitle}>
                <h2 className={s.recipePageTitle_h2}>{recipe.name}</h2>
            </div>
            <div className={s.recipePage_info}>
                <div className={s.recipePage_info_item}>
                    <img src="../images/time.png" alt="" />
                    {recipe.time}
                </div>
                <div className={s.recipePage_info_item}>
                    Количество порций: {recipe.porcions}
                    <img src="../images/plate.png" alt="" />
                </div>


            </div>
            <Container className="mt-2">
                <Row>
                    <Col>
                        <Image width={400} height={300} src={process.env.REACT_APP_API_URL + recipe.img} />
                    </Col>
                    <Col>
                        <Row className={s.recipePage_ingredients}>
                            <Row className="d-flex">
                                <h2>Ингредиенты:</h2>
                                {/* пробегаемся по массиву с ингредиентами и отрисовываем каждую строку */}
                                {recipe.ingredients.map((ingredients, index) =>
                                    <Row key={ingredients.id} className={s.recipePage_ingredients_row} style={{ background: index % 2 === 0 ? '#A8C770' : '#CDDFAD' }}>
                                        <div className={s.recipePage_ingredients_flex}>
                                            <div className={s.recipePage_ingredients_item}>{ingredients.name}:</div>
                                            <div className={s.recipePage_ingredients_item}>{ingredients.quantity}</div>
                                        </div>

                                    </Row>
                                )}
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Container className={s.recipePage_description}>
                <h2>Способ приготовления:</h2>
                <Row className="d-flex flex-column">
                    {/* пробегаемся по массиву с ингредиентами и отрисовываем каждую строку */}
                    {recipe.description.map((description) =>
                        <ol key={description.id}>
                            {description.name}
                        </ol>
                    )}
                </Row>
            </Container>

        </div>
    )
}

export default RecipePage;