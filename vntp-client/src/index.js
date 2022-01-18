import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import HomePage from './views/HomePage';
import SearchPage from './views/SearchPage';
import RegisterPage from './views/RegisterPage';
import LoginPage from './views/LoginPage';
import ProfilePage from './views/ProfilePage';
import LogoutPage from './views/LogoutPage';
import HistoryPage from './views/HistoryPage';
import { AuthContextProvider } from './context/auth';
import './index.css';
import ReadingTimerPage from './views/ReadingTimerPage';
import NotFoundPage from './views/NotFoundPage';
import InstructionPage from './views/InstructionsPage';
import UpdatePasswordPage from './views/UpdatePasswordPage';

ReactDOM.render(
  <AuthContextProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/register" element={<RegisterPage />} ></Route>
        <Route path="/login" element={<LoginPage />} ></Route>
        <Route path="/logout" element={<LogoutPage />} ></Route>
        <Route path="/updatepwd" element={<UpdatePasswordPage />} ></Route>
        <Route path="/profile" element={<ProfilePage />} ></Route>
        <Route path="/history" element={<HistoryPage />} ></Route>
        <Route path="/reader/:vndbID" element={<ReadingTimerPage />}></Route>
        <Route path="/howto" element={<InstructionPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </Router>
  </AuthContextProvider>
,
  document.getElementById('root')
);
