import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import UserRecipes from './recipe/UserRecipes';
import EntityRecipes from './recipe/EntityRecipes';

export const Context = createContext(null) // Контекст позволяет передавать значение глубоко
                                           // в дерево компонентов без явной передачи пропсов

ReactDOM.render(
  <Context.Provider value={{
    user: new UserRecipes(),
    recipe: new EntityRecipes()
  }}>

    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Context.Provider>,
  document.getElementById('root')
);


