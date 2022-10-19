import React from 'react';
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { RECIPE_ROUTE } from '../../../utils/const';
import s from './styleRecipeByCategory/RecipeItem.module.css';

const RecipeItem = ({ recipe }) => {
  //вместо useHistory использовала useNavigate для перемещения на страницу рецепта при клике
  const navigate = useNavigate()
  return (
    <Col md={4} className={s.recipeItem} onClick={() => navigate(RECIPE_ROUTE + '/' + recipe.id)}>
      <Card className={s.recipeCard} style={{cursor: 'pointer', width: 300 }} border={"light"}>
        <div className="d-flex" >
          <div className={s.recipeName}>
            {recipe.name}
          </div>
        </div>
        <Image className={s.recipeImg} src={process.env.REACT_APP_API_URL + recipe.img} />
        <hr style={{ margin: 10 }} />

        <div className="text-black-50 d-flex align-items-center">

          <div className={s.recipeInfo}>
            <Image width={25} src="../images/time.png" alt="Время приготовления" />
            {recipe.time}
            <Image width={40} src="../images/plate.png" alt="Колчество порций" />
            {recipe.porcions}
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default RecipeItem; 