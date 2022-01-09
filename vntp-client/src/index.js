import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import LandingPage from './views/LandingPage';
import SearchPage from './views/SearchPage';
import RegisterPage from './views/RegisterPage';
import LoginPage from './views/LoginPage';
import './index.css';


ReactDOM.render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/search" element={<SearchPage />}></Route>
      <Route path="/register" element={<RegisterPage />} ></Route>
      <Route path="/login" element={<LoginPage />} ></Route>
    </Routes>
  </Router>,
  document.getElementById('root')
);
