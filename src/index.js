import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Add from "./pages/add";
import Verify from "./pages/verify";
import Show from "./pages/show";
import Token from './pages/token';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter >
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/add" element={<Add />} />
      <Route path="/verify">
        <Route path="" element={<Verify />} />
        <Route path=":id" element={<Token />} />
      </Route>
      <Route path="/show" element={<Show />} />
    </Routes>
  </BrowserRouter>
);
