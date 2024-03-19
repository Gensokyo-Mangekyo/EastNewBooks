import React from 'react';
import Main from './Pages/Main';
import ReactDOM from 'react-dom';
import "../src/styles/App.css"
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import SearchQuery from './Pages/SearchQuery';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Main></Main>}></Route>
    <Route path='/SearchBooks/:search' element={<SearchQuery></SearchQuery>}></Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

