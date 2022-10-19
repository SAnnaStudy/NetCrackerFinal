import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import { Context } from '../index';
import Main from '../pages/Main';
import { authRoutes, publicRoutes } from '../routesPages';
import Footer from './Footer/Footer';

const AppRouter = () => {
    const {user} = useContext(Context) //этот хук позволяет нам получить текущее значение контекста

    console.log(user);

    return (
        <div>
            <Routes>
              {/* для авторизованных пользователей */}
              {user.isAuth && authRoutes.map(({pathPage, ComponentPage}) =>
                <Route key={pathPage} path={pathPage} element={<ComponentPage />} exact/>
              )}

              {/* для всех пользователей */}
              {publicRoutes.map(({pathPage, ComponentPage}) =>
                <Route key={pathPage} path={pathPage} element={<ComponentPage />} exact/>
              )}
              {/* страница по умолчанию */}
              <Route path='*' element={<Main />} />
        </Routes>

        <Footer/>
        </div>
    )
}


export default AppRouter;