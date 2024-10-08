import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import CalendarPage from './components/CalendarPage';
import AddEventForm from './components/AddEventForm';  // Usamos directamente AddEventForm
import EventDetailsPage from './components/EventDetailsPage';

function App() {
  const [events, setEvents] = React.useState([]);

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
            <li>
              <Link to="/formulario">Añadir evento</Link>  {/* Nueva ruta para el formulario */}
            </li>
          </ul>
        </nav>

        {/* Definición de rutas */}
        <Routes>
          <Route path="/" element={<MainPage events={events} />} />
          <Route path="/calendario" element={<CalendarPage events={events} setEvents={setEvents} />} />
          <Route path="/formulario" element={<AddEventForm onSubmit={(newEvent) => {
            setEvents([...events, newEvent]);  // Actualizamos el estado de eventos
          }} />} />
          <Route path="/evento/:eventId" element={<EventDetailsPage events={events} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
