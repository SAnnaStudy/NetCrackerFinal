import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../../index';
import { USER_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, RECIPES_ROUTE, SEARCHBYINGREDIENTS_ROUTE, SEARCHBYNAME_ROUTE } from '../../utils/const';
import styles from './NavBar.module.css';
import { observer } from 'mobx-react-lite';
import { useNavigate } from "react-router-dom";
import UserPanel from "./../../pages/UserPanel"
import { useState } from 'react';
import Auth from "./../../pages/Auth"
//useNavigate вместо useHistory, чтобы при нажатии на кнопку перемещаться к админ-панели

const buttonLeave = (e) => {
    e.target.style.backgroundColor = 'rgba(130, 175, 51, 1)';
}
const buttonEnter = (e) => {
    e.target.style.backgroundColor = 'rgb(102, 138, 40)';
    e.target.style.cursor = 'pointer';
}
const menuLeave = (e) => {
    e.target.style.color = 'white';
}
const menuEnter = (e) => {
    e.target.style.color = 'rgba(130, 175, 51, 1)';
    e.target.style.cursor = 'pointer';
}

const NavBar = observer(() => {
    //в зависимости от того, авторизован пользователь или нет будет отображаться по разному
    const { user } = useContext(Context);
    const history = useNavigate();

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    const [adminVisible, setAdminVisible] = useState(false);
    const [authVisible, setAuthVisible] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <div className={styles.logo_pic}></div>
                <div className={styles.logo_text}>Просто вкусно</div>
            </div>

            <nav className={styles.menu}>
                <div className={styles.menu_items}>
                    <NavLink to={MAIN_ROUTE} className={styles.menu_item} onMouseLeave={menuLeave} onMouseEnter={menuEnter}>Главная</NavLink>
                    <NavLink to={RECIPES_ROUTE} className={styles.menu_item} onMouseLeave={menuLeave} onMouseEnter={menuEnter}>Рецепты по категориям</NavLink>
                    <NavLink to={SEARCHBYNAME_ROUTE} className={styles.menu_item} onMouseLeave={menuLeave} onMouseEnter={menuEnter}>Поиск по названию</NavLink>
                    <NavLink to={SEARCHBYINGREDIENTS_ROUTE} className={styles.menu_item} onMouseLeave={menuLeave} onMouseEnter={menuEnter}>Поиск по ингридиентам</NavLink>
                </div>

                {user.isAuth ?
                    <div className={styles.buttons}>
                        <div onClick={() => setAdminVisible(true)} className={styles.button} onMouseLeave={buttonLeave} onMouseEnter={buttonEnter}>  + свой рецепт </div>
                        <div onClick={() => logOut()} className={styles.button2} onMouseLeave={buttonLeave} onMouseEnter={buttonEnter}> Выйти </div>
                    </div>
                    :
                    <div className={styles.buttons}>
                        <div onClick={() => setAuthVisible(true)} className={styles.button3} onMouseLeave={buttonLeave} onMouseEnter={buttonEnter}>Авторизация</div>
                    </div>
                }
            </nav>
                <UserPanel show={adminVisible} onHide={() => setAdminVisible(false)} setAdminVisible={setAdminVisible} />   
                <Auth show={authVisible} onHide={() => setAuthVisible(false)} setAuthVisible={setAuthVisible} ></Auth>  
        </header>
    )
});

export default NavBar;