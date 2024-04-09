import React from 'react';
import Main from './Pages/Main';
import ReactDOM from 'react-dom';
import "../src/styles/App.css"
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import SearchQuery from './Pages/SearchQuery';
import ShowInfoBook from './Pages/ShowInfoBook';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Main></Main>}></Route>
    <Route path='/SearchBooks/:searchParam' element={<SearchQuery></SearchQuery>}></Route>
    <Route path='/Book/:id' element={<ShowInfoBook/>}></Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

