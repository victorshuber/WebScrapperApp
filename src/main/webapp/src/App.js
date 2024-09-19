import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Боковое меню */}
        <aside className="sidebar">
          <h2>WEB SCRAPPER</h2>
          <nav>
            <ul>
              <li><Link to="/home">Главная</Link></li>
              <li><Link to="/profile">Личный кабинет</Link></li>
            </ul>
          </nav>
        </aside>

        {/* Основной контент */}
        <div className="main-content">
          <header className="top-nav">
            <nav>
              <ul>
                <li><Link to="/home">Главная</Link></li>
                <li><Link to="/profile">Личный кабинет</Link></li>
              </ul>
            </nav>
          </header>

          <div className="content">
            <Routes>
              <Route path="/home" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;


/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */
