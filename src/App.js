import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import MainPage from './components/MainPage';
import CalendarPage from './components/CalendarPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Menú de navegación */}
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/calendario">Calendario</Link>
            </li>
          </ul>
        </nav>

        {/* Definición de rutas */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/calendario" element={<CalendarPage />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
