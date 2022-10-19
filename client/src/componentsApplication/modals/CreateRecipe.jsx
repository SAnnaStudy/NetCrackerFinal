import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Button, Dropdown, Row, Col } from "react-bootstrap";
import { Context } from '../..';
import { createRecipe, fetchCategories } from '../../http/recipeAPI';
import { observer } from 'mobx-react-lite';

const CreateRecipe = observer(({ show, onHide }) => {
    const { recipe } = useContext(Context);

    //для обработки инпутов для каждого создаем одноименное состояние:
    const [name, setName] = useState(''); //название
    const [time, setTime] = useState(''); //время приготовления
    const [porcions, setPorcions] = useState(1); //колличество порций (1 по умолчанию)
    const [file, setFile] = useState(null); //для загрузки изображения
    const [category, setCategory] = useState(null); //состояние по умолчанию для выбранной категории
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


    //заполнение name, quantity для каждого объекта (ингредиенты и этапы)
    const changeDescription = (key, value, number) => {
        //тоже самое для массива этапов приготовления
        setDescription(description.map(i => i.number === number ? { ...i, [key]: value } : i));
    }
    const changeIngredients = (key, value, number) => {
        //пробегаемся по массиву ингредиентов, если номер совпадает с номером элемента итерации, 
        //возвращаем новый объект, разворачиваем в него характеристику и по ключу заменяем у него поле
        //если номер не совпадает, возвращаем объект не измененным
        setIngredients(ingredients.map(i => i.number === number ? { ...i, [key]: value } : i));
    }


    //ф-ия, которая будет вызываться, когда мы выбрали файл на компьютере
    const selectFile = e => {
        setFile(e.target.files[0]); //сохраняем состояние этого файла
    }

    //ф-ия, которая будет отрпавлять запрос на сервер и добавлять новый рецепт
    const addRecipe = () => {
        //при отправке запроса на создание рецепта импользуем не строку формата json, а formData
        const formData = new FormData();
        //первым параметром передаем ключ, а вторым значение
        formData.append('name', name);
        formData.append('time', time);
        formData.append('porcions', `${porcions}`);
        formData.append('categoryId', recipe.selectedCategory.id);
        formData.append('img', file);
        formData.append('description', JSON.stringify(description));
        formData.append('ingredients', JSON.stringify(ingredients));
        createRecipe(formData).then(data => onHide());
    }

    return (
        <Modal
            // show отвечает за то, виден компонент или нет
            // outHide - функция, которая скрывает окно
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый рецепт
                </Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    {/* чтобы выбирать категорию рецепта в выпадающем меню */}
                    <Dropdown>
                        <Dropdown.Toggle>{recipe.selectedCategory.name || "Выберите категорию"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {recipe.categories.map(category =>
                                <Dropdown.Item
                                    onClick={() => recipe.setSelectedCategory(category)}
                                    key={category.id}
                                >
                                    {category.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* добавим поля ввода для описания рецепта */}
                    Название:
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder='Введите название вашего рецепта'
                        type="text"
                    />

                    Время приготовления:
                    <Form.Control
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        className="mt-3"
                        placeholder='30 мин.'
                        type="text"
                    />

                    Количество порций:
                    <Form.Control
                        value={porcions}
                        onChange={e => setPorcions(Number(e.target.value))}
                        className="mt-3"
                        placeholder='3'
                        type="number"
                    />

                    Загрузить фотографию:
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
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
                                        value={i.name}
                                        onChange={(e) => changeIngredients('name', e.target.value, i.number)} //номер получаем из элемента текущей итерации
                                        placeholder='Введите название ингредиента'
                                        type="text"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.quantity}
                                        onChange={(e) => changeIngredients('quantity', e.target.value, i.number)}
                                        placeholder='Введите количество'
                                        type="text"
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
                                        value={i.name}
                                        onChange={(e) => changeDescription('name', e.target.value, i.number)} //номер получаем из элемента текущей итерации
                                        placeholder='Введите этап приготовления'
                                        type="text"
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
                    <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                    <Button type='submit' variant="outline-success" onClick={addRecipe}>Добавить</Button>
                </Modal.Footer>
            </Form>

        </Modal>
    );
});

export default CreateRecipe;