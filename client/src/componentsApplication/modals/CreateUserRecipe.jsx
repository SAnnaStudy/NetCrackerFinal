import React, { useContext, useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Modal from "react-bootstrap/Modal";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Context } from '../..';
import { fetchCategories } from '../../http/recipeAPI';
import { observer } from 'mobx-react-lite';

const CreateUserRecipe = observer(({ show, onHide, setAdminVisible, setRecipeVisible  }) => {
    const { recipe } = useContext(Context);

    //для обработки инпутов для каждого создаем одноименное состояние:
    //добавим массивы ингредиентов и этапы приготовления
    const [description, setDescription] = useState([]); //этапы приготовления
    const [ingredients, setIngredients] = useState([]); //ингредиенты

    //единыжды при открытии модального подгружать рецепты, массив зависимостей вторым параметром передаем пустым
    useEffect(() => {
        //в случае успешного запроса у recipe вызываем метод, передаем в него то, что вернулось в запросе
        fetchCategories().then(data => recipe.setCategories(data));
    }, [])

    //добавление ингредиента и этапа приготовления
    const addDescription = () => {
        setDescription([...description, { name: '', number: Date.now() }]);
    }
    const addIngredients = () => {
        setIngredients([...ingredients, { name: '', quantity: '', number: Date.now() }]);
    }


    //удаление ингредиента и этапа приготовления
    const removeIngredients = (number) => {
        setIngredients(ingredients.filter(i => i.number !== number));
    }
    const removeDescription = (number) => {
        setDescription(description.filter(i => i.number !== number));
    }

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('gmail', 'template_djg2aro', form.current, 'user_lj8kFltmTmOYAkl4cOAbx')
            .then((result) => {
                alert("Спасибо за ваш рецепт! Мы добавим его после проверки!");
            }, (error) => {
                console.log(error.text);
            });
    };

    const newAllVisible = () => {
        setAdminVisible(false);
        onHide();
    }
    const styles={
        modal: {
           margin: 'auto'
        },
        header: {
            display: 'block'
        }
    }
    const cursorPoint = (e) => {
        e.target.style.cursor =  'pointer';
    }

    return (
        <Modal
            // show отвечает за то, виден компонент или нет
            // outHide - функция, которая скрывает окно
            show={show}
            onHide={onHide}
            centered
            style={styles.modal}
        >
            <Modal.Header style={styles.header}>
            <div style={styles.back} onClick={onHide} onMouseEnter={cursorPoint}>Назад</div>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый рецепт
                </Modal.Title>
            </Modal.Header>
            <Form ref={form} onSubmit={sendEmail}>
                <Modal.Body>
                    {/* добавим поля ввода для описания рецепта */}
                    Название:
                    <Form.Control
                        className="mt-3"
                        placeholder='Введите название вашего рецепта'
                        type="text"
                        name="name"
                    />

                    Время приготовления:
                    <Form.Control
                        className="mt-3"
                        placeholder='30 мин.'
                        type="text"
                        name="time"
                    />

                    Количество порций:
                    <Form.Control
                        className="mt-3"
                        placeholder='3'
                        type="number"
                        name="porcions"
                    />
                    
                    <hr />
                    <Button
                        variant={"outline-dark"}
                        onClick={addIngredients}
                    >
                        Добавить ингредиент
                    </Button>
                    {
                        ingredients.map(i =>
                            <Row className="mt-4" key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder='Введите название ингредиента'
                                        type="text"
                                        name="name_ingredients"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder='Введите количество'
                                        type="text"
                                        name="quantity_ingredients"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button
                                        variant={"outline-danger"}
                                        onClick={() => removeIngredients(i.number)}
                                    >
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>
                        )
                    }

                    <hr />

                    <Button
                        variant={"outline-dark"}
                        onClick={addDescription}
                    >
                        Добавить этап приготовления
                    </Button>
                    {
                        description.map(i =>
                            <Row className="mt-4" key={i.number}>
                                <Col>
                                    <Form.Control
                                        as="textarea"
                                        rows="1"
                                        placeholder='Введите этап приготовления'
                                        type="text"
                                        name="description"
                                    />
                                </Col>

                                <Col md={4}>
                                    <Button
                                        variant={"outline-danger"}
                                        onClick={() => removeDescription(i.number)}
                                    >
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>
                        )
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={newAllVisible}>Закрыть</Button>
                    <Button type='submit' variant="outline-success" onClick={onHide}>Добавить</Button>
                </Modal.Footer>
            </Form>

        </Modal>
    );
});

export default CreateUserRecipe;