import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './app/layouts/Header.css';
import './app/layouts/Footer.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './app/layouts/Footer.js';
import Header from './app/layouts/Header.js';
import Home from './app/pages/home/Home.js';

function App(){
  return(
    <>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )  
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);