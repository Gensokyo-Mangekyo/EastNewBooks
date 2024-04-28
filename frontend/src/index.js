import React from 'react';
import Main from './Pages/Main';
import ReactDOM from 'react-dom';
import "../src/styles/App.css"
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import SearchQuery from './Pages/SearchQuery';
import ShowInfoBook from './Pages/ShowInfoBook';
import Auth from './Pages/Auth';
import Reg from './Pages/Reg';
import UserCabinet from './Pages/UserCabinet'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Main></Main>}></Route>
    <Route path='/:filter' element={<Main></Main>}></Route>
    <Route path='/SearchBooks/:searchParam' element={<SearchQuery></SearchQuery>}></Route>
    <Route path='/Book/:id' element={<ShowInfoBook/>}></Route>
    <Route path='/Auth' element={<Auth></Auth>}></Route>
    <Route path='/Reg' element={<Reg></Reg>}></Route>
    <Route path='/UserCabinet' element={<UserCabinet></UserCabinet>}></Route>
    <Route path='*' element={<div>Страница не найдена!</div>}></Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

