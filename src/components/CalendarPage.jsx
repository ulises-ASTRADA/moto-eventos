// src/components/CalendarPage.jsx
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configuración del localizador de fechas
const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      title: "Evento de ejemplo",
      start: new Date(),
      end: new Date(),
      allDay: true,
    },
  ]);

  return (
    <div>
      <h1>Calendario de Eventos</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CalendarPage;
