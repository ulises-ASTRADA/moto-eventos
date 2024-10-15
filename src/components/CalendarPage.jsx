import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';  // Importar el idioma español para Moment.js
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// Configuración del localizador de fechas en español
moment.locale('es');  // Establecer el idioma a español
const localizer = momentLocalizer(moment);

// Mensajes personalizados para traducir el calendario a español
const messages = {
  allDay: 'Todo el día',
  previous: 'Atras',
  next: 'Siguiente',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'No hay eventos en este rango.',
  showMore: total => `+ Ver más (${total})`
};

const CalendarPage = ({ events }) => {
  const navigate = useNavigate();

  // Función para manejar la selección de un evento
  const handleSelectEvent = (event) => {
    const eventIndex = events.indexOf(event);
    navigate(`/evento/${eventIndex}`);
  };

  return (
    <Box p={5}>
      {/* Color del título en naranja, como en MainPage */}
      <Heading as="h1" mb={4} color="orange.400">Calendario de Eventos</Heading>
      <Box borderWidth="1px" borderRadius="md" p={4} boxShadow="md">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          messages={messages}  // Añadir mensajes traducidos
          onSelectEvent={handleSelectEvent}
          dayPropGetter={(date) => {
            const today = new Date();
            const isToday = date.toDateString() === today.toDateString();

            return {
              style: {
                backgroundColor: isToday ? '#F6AD55' : 'gray',  // Fondo naranja para el día actual
                color: isToday ? 'white' : 'gray.800',  // Texto blanco en el día actual, gris en los demás días
              }
            };
          }}
        />
      </Box>
    </Box>
  );
};

export default CalendarPage;
