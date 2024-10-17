import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import './App.css';
import MainPage from './components/MainPage';
import CalendarPage from './components/CalendarPage';
import AddEventForm from './components/AddEventForm';
import LoginPage from './components/LoginPage';
import EventDetailsPage from './components/EventDetailsPage';
import Navbar from './components/Navbar'; // Nuevo componente
import { auth } from './firebaseConfig';

function App() {
  const [events, setEvents] = useState([]);
  const [userRole, setUserRole] = useState(null);  // Estado para manejar los roles (user/organizer)
  const [user, setUser] = useState(null); // Estado para el usuario autenticado

  useEffect(() => {
    // Mantén el estado actualizado cuando el usuario inicie o cierre sesión
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setUserRole(currentUser ? (currentUser.role || 'user') : null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Box
        bgImage="url('/images/background-moto.jpg')" 
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        minH="100vh"
        color="white"
      >
        <Flex direction="column" minH="100vh" bg="rgba(0, 0, 0, 0.7)" p={5}>
          {/* Nuevo menú de navegación */}
          <Navbar user={user} userRole={userRole} setUserRole={setUserRole} />

          {/* Definición de rutas */}
          <Routes>
            <Route path="/" element={<MainPage events={events} />} />
            <Route path="/calendario" element={<CalendarPage events={events} setEvents={setEvents} />} />
            <Route path="/login" element={<LoginPage setUserRole={setUserRole} />} />
            
            {/* Ruta protegida: Solo los organizadores pueden acceder */}
            <Route
              path="/formulario"
              element={
                userRole === 'organizer' ? (
                  <AddEventForm onSubmit={(newEvent) => setEvents([...events, newEvent])} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route path="/evento/:eventId" element={<EventDetailsPage events={events} />} />
          </Routes>
        </Flex>
      </Box>
    </Router>
  );
}

export default App;
