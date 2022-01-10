import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import LandingPage from './views/LandingPage';
import SearchPage from './views/SearchPage';
import RegisterPage from './views/RegisterPage';
import LoginPage from './views/LoginPage';
import ProfilePage from './views/ProfilePage';
import { AuthContextProvider } from './context/auth';
import './index.css';

ReactDOM.render(
  <AuthContextProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/register" element={<RegisterPage />} ></Route>
        <Route path="/login" element={<LoginPage />} ></Route>
        <Route path="/profile" element={<ProfilePage />} ></Route>
      </Routes>
    </Router>
  </AuthContextProvider>
,
  document.getElementById('root')
);
