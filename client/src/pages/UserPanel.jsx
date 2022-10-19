import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import CreateUserRecipe from '../componentsApplication/modals/CreateUserRecipe';


const styles={
    back: {
        width: '50px',
        heigh: '20px',
        marginTop: '5px'
    },
    body: {
        width: '250px',
        margin: 'auto',
    },
    button2: {
        width: '218px',
        marginBottom: '20px'
    },
    header: {
        display: 'block'
    },
    modal: {
        width: '450px',
        marginLeft: '35%',
    }
}

const cursorPoint = (e) => {
    e.target.style.cursor =  'pointer';
}

const UserPanel = ({ show, onHide, setAdminVisible }) => {
    //создадим два состояния, чтобы определить видим мы модальное окно или нет
    const [recipeVisible, setRecipeVisible] = useState(false);
    /*closeButton*/
    return (
        <Modal show={show} onHide={onHide} centered style={styles.modal}>
            <Modal.Header style={styles.header}>
                <div style={styles.back} onClick={onHide} onMouseEnter={cursorPoint}>Назад</div>
                <Modal.Title id="contained-modal-title-vcenter">Делитесь любимыми рецептами</Modal.Title>
            </Modal.Header>
            <Modal.Body  style={styles.body}>
                <Button style={styles.button2} variant={"outline-dark"} className="mt-4 p-2" onClick={() => setRecipeVisible(true)}>Добавить рецепт</Button>
                <CreateUserRecipe show={recipeVisible} onHide={() => setRecipeVisible(false)} setAdminVisible={setAdminVisible} setRecipeVisible={setRecipeVisible}/>
            </Modal.Body>
        </Modal>
    )
}

export default UserPanel;