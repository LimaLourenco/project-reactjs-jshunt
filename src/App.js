import React, { Component } from "react";

import Routes from "./routes";

import './styles.css';

import Header from "./components/Header";

import Main from "./pages/main";
 
const App = () => (
  <div className = "App">
    <Header />
    <Routes />
  </div>
);

// Configurando navegação e pagina de detalhes dos produtos.

export default App;