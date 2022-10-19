import React from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { useState } from 'react';
import { createCategory } from '../../http/recipeAPI';


const CreateCategory = ({ show, onHide, setAdminVisible, setCategoryVisible }) => {
    //show отвечает за то, виден компонент или нет
    //outHide - функция, которая скрывает окно


    //инпут для добавления категории
    const [value, setValue] = useState('');

    //ф-ия добавления категории
    const addCategory = () => {
        //отправляем запрос на сервер к функции создания категории
        //в случае успешного запроса, обнуляем инпут и закрываем модальное окно
        createCategory({ name: value }).then(data => {
            setValue('');
            newAllVisible();
            onHide(onHide);
        })
    }

    const newAllVisible = () => {
        setCategoryVisible(false);
        setAdminVisible(false);
        onHide();
    }
    const styles={
        back: {
            width: '50px',
            heigh: '20px',
            margin: '5px 5px 0 0'
        },
        modalC: {
            margin: '0px 0 40px',
            display: 'block'
        }, 
        modal: {
            width: '440px',
            marginLeft: '35%',
        },
        footer: {
            margin: '30px 0 10px'
        }
    }
    const cursorPoint = (e) => {
        e.target.style.cursor =  'pointer';
    }

    return (
        <Modal show={show} onHide={onHide} centered style={styles.modal}>
            <Modal.Header  style={styles.modalC}>
                <div style={styles.back} onClick={onHide} onMouseEnter={cursorPoint}>Назад</div>
                <Modal.Title id="contained-modal-title-vcenter">Добавить новую категорию</Modal.Title>
            </Modal.Header>
            <Form >
                <Modal.Body>
                    <Form.Control value={value} onChange={e => setValue(e.target.value)} placeholder={"Введите название категории"}/>
                </Modal.Body>
                <Modal.Footer style={styles.footer}>
                    <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                    <Button variant="outline-success" onClick={addCategory}>Добавить</Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )
}

export default CreateCategory;