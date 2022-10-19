import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import { Spinner } from 'react-bootstrap';
import { Context } from '.';
import './App.css';
import AppRouter from './componentsApplication/AppRouter';
import NavBar from './componentsApplication/Header/NavBar';
import { check } from './http/userAPI';

const App = observer(() => {
  const { user } = useContext(Context);
  //локальное состояние, которое отвечает за то, что идет загрузка страницы или нет
  const [loading, setLoading] = useState(true); //по умолчанию true -> на страницу добавляем какую-нибудь крутилку -> отправляется запрос на проверку пользователя -> когда вернулся ответ -> состояние меняется на false и страница загружается

  //отправляем этот запрос только 1 раз при открытии приложения (если массив состояний пустой, функция отработает 1 раз)
  useEffect(() => {
    check().then(data => {
      user.setUser(true);
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, []);

  if(loading) {
    return <Spinner animation={"grow"}/> //если страница будет долго загружаться
  }

  return (
    <div>
      <NavBar />
      <AppRouter />
    </div>

  );
});

export default App;
