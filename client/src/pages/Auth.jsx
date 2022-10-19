import React, {useContext, useState} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Form, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/const';
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from '..';
import { useNavigate } from "react-router-dom"; //вместо useHistory


const Auth = observer(({show, onHide, setAuthVisible}) => {
    const { user } = useContext(Context);
    const location = useLocation(); //можно получить маршрут в строке запроса
    const navigate = useNavigate(); //после того, как пользователь залогинился, отправляем его на главную страницу
    const isLogin = location.pathname === LOGIN_ROUTE; //будет true, если маршрут совпадает с login_route
    //сделаем инпуты управляемыми
    const [email, setEmail] = useState('');  //состояние содержит значение инпута с имейлом
    const [password, setPassword] = useState(''); //состояние содержит значение инпута с паролем

    //функция запросов на регистрацию и авторизацию
    const click = async () => {
        try {
            let data; //пользователь
            //если логин существует, вызываем запрос на авторизацию
            if (isLogin) {
                data = await login(email, password); //после запроса возвращается пользователь
            } else {
                //запрос на регистрацию
                data = await registration(email, password);
            }
            //сохраняем даданные о пользователе
            user.setUser(user);
            user.setIsAuth(true);
            navigate(MAIN_ROUTE);
            onHide(onHide);
        } catch (e) {
            alert(e.response.data.message);
        }

    }

    const styles={
        back: {
            width: '50px',
            heigh: '20px',
            marginTop: '5px'
        },
        header: {
            display: 'block',
            marginLeft: '5%',
        },
        button: {
            backgroundColor: 'rgba(130, 175, 51, 1)',
            width: '95%',
            padding: '5px 0 5px',
            borderRadius: '5px',
            fontSize: '16px',
            textAlign: 'center',
            textTransform: 'uppercase',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 'auto',
            marginBottom: '10px'
        },
        body: {
            width: '90%',
            margin: 'auto',
        },
        text: {
            marginTop: '20px'
        },
        link: {
            color: 'darkgreen',
            textDecoration: 'none'
        }
    }

    const cursorPoint = (e) => {
        e.target.style.cursor =  'pointer';
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header style={styles.header}>
                <div style={styles.back} onClick={onHide} onMouseEnter={cursorPoint}>Назад</div>
                <Modal.Title id="contained-modal-title-vcenter">{isLogin ? "Авторизация" : "Регистрация"}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={styles.body}>
                    <Form>
                        <Form.Control type="email" placeholder="Введите ваш email" value={email} onChange={e => setEmail(e.target.value)}/>
                        <Form.Control placeholder="Введите ваш пароль" value={password} onChange={e => setPassword(e.target.value)} type="password"/>
                        <Row>
                            {isLogin ?
                                <div  style={styles.text}> Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} style={styles.link}>Зарегистрируйся!</NavLink></div>
                                :
                                <div  style={styles.text}> Есть аккаунт? <NavLink to={LOGIN_ROUTE} style={styles.link}>Войдите!</NavLink></div>
                            }
                            <Button onClick={click}  onMouseEnter={cursorPoint} style={styles.button}>{isLogin ? "Войти" : "Регистрация"}</Button>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
    )
})

export default Auth;