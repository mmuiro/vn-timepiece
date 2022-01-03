import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import './index.css';

ReactDOM.render(
  <Router>
    <Navbar />
    <h1>Let's get started.</h1>
  </Router>,
  document.getElementById('root')
);
