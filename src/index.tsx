import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import './Styles/index.scss';
import "./Styles/Home.scss";
import "./Styles/RoomHomepage.scss";

import Home from './Components/Home'
import RoomHomepage from './Components/RoomHomepage/RoomHomepage';
import TodoApp from './Components/Todo-App/Todo-App';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/room-homepage' element={ <RoomHomepage /> }/>
      <Route path='/todo-app' element={ <TodoApp /> }/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
