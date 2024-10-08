// src/components/CalendarPage.jsx
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddEventForm from './AddEventForm';


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

  const handleAddEvent = (values) => {
    const newEvent = {
      title: values.title,
      start: new Date(values.start),
      end: new Date(values.end),
    };
    setEvents([...events, newEvent]);
  };

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

    <h2>Añadir un nuevo evento</h2>
    <AddEventForm onSubmit={handleAddEvent} />
    </div>
  );
};

export default CalendarPage;
