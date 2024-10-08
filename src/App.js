import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import './App.css';
import MainPage from './components/MainPage';
import CalendarPage from './components/CalendarPage';
import AddEventForm from './components/AddEventForm';
import EventDetailsPage from './components/EventDetailsPage';

function App() {
  const [events, setEvents] = React.useState([]);

  return (
    <Router>
      <Box
        bgImage="url('/images/background-moto.jpg')" // Aquí debes colocar la ruta de tu imagen de motos
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        minH="100vh"
        color="white"  // Para que el texto sea más legible en un fondo oscuro
      >
        <Flex direction="column" minH="100vh" bg="rgba(0, 0, 0, 0.7)" p={5}>
          {/* Menú de navegación */}
          <nav>
            <ul style={{ display: 'flex', gap: '15px' }}>
              <li><Link to="/" style={{ color: 'white' }}>Inicio</Link></li>
              <li><Link to="/calendario" style={{ color: 'white' }}>Calendario</Link></li>
              <li><Link to="/formulario" style={{ color: 'white' }}>Añadir evento</Link></li>
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
        </Flex>
      </Box>
    </Router>
  );
}

export default App;
