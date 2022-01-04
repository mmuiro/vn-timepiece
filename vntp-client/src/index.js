import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import LandingPage from './views/LandingPage';
import SearchPage from './views/SearchPage';
import './index.css';

ReactDOM.render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/search" element={<SearchPage />}></Route>
    </Routes>
  </Router>,
  document.getElementById('root')
);
