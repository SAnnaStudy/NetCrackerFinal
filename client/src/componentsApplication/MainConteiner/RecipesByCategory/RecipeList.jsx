import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import {Row} from "react-bootstrap";
import { Context } from '../../..';
import RecipeItem from './RecipeItem';

const RecipeList = observer(() => {
  const { recipe } = useContext(Context);
  return (
    <Row className="d-flex">
        {recipe.recipes.map(recipe =>
               <RecipeItem key={recipe.id} recipe={recipe} /> 
            )}
    </Row>
  );
});

export default RecipeList; 