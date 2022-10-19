import React from 'react';
import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateCategory from '../componentsApplication/modals/CreateCategory';
import CreateRecipe from '../componentsApplication/modals/CreateRecipe';

const AdminPanel = () => {
    //создадим два состояния, чтобы определить видим мы модальное окно или нет
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [recipeVisible, setRecipeVisible] = useState(false);
    return (
        <div>
            <Container className="d-flex flex-column">
                <Button variant={"outline-dark"} className="mt-4 p-2" onClick={() => setCategoryVisible(true)}>Добавить категорию рецепта</Button>
                <Button variant={"outline-dark"} className="mt-4 p-2" onClick={() => setRecipeVisible(true)}>Добавить рецепт</Button>
                <CreateCategory show={categoryVisible} onHide={() => setCategoryVisible(false)} />
                <CreateRecipe show={recipeVisible} onHide={() => setRecipeVisible(false)} />
            </Container>
        </div>
    )
}

export default AdminPanel;