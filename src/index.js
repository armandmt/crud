import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={ <Menu/>}>
            <Route index element= {<App/>} />
            <Route path="about" element= {<About/>} />
            <Route path="login" element= {<Login/>} />
            <Route path="*" element= {<App/>} />
        </Route>
    </Routes>
    <App />
    </BrowserRouter>
    ,document.getElementById('root')
);

