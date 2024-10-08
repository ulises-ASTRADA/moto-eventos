import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// Configuración del localizador de fechas
const localizer = momentLocalizer(moment);

const CalendarPage = ({ events }) => {
  const navigate = useNavigate();

  // Función para manejar la selección de un evento
  const handleSelectEvent = (event) => {
    const eventIndex = events.indexOf(event);
    navigate(`/evento/${eventIndex}`);
  };

  return (
    <Box p={5}>
      <Heading as="h1" mb={4}>Calendario de Eventos</Heading>
      <Box borderWidth="1px" borderRadius="md" p={4} boxShadow="md">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleSelectEvent}
        />
      </Box>
    </Box>
  );
};

export default CalendarPage;
