import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {Provider} from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import './Styles/index.scss';

import Home from './Components/Home'
import RoomHomepage from './Components/RoomHomepage/RoomHomepage';
import TodoApp from './Components/Todo-App/Todo-App';
import TodoAppHome from './Components/Todo-App/Home-Todo';
import ModalProject from './Components/Todo-App/Modal-Add-Project';
import Signin from './Components/Todo-App/Signin';
import HomeRightModal from './Components/Todo-App/Home-Right-Modal';

import { store } from './Redux/Store'

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <TodoAppHome /> }>
          <Route path='add-project' element={ <ModalProject /> }/>
          <Route path='menu-modal' element={ <HomeRightModal /> }/>
        </Route>
        <Route path='/projectPage/:projectId/:projectIndex' element={ <TodoApp /> }/>
        {/* <Route path='/' element={ <Home /> } /> */}
        <Route path='/room-homepage' element={ <RoomHomepage /> }/>
        <Route path='/signin' element={ <Signin /> }/>
      </Routes>
    </BrowserRouter>
  </Provider>
    
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
