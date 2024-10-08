// src/components/CalendarPage.jsx
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddEventForm from './AddEventForm';
import { useNavigate } from 'react-router-dom';

// Configuración del localizador de fechas
const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      title: "Evento de ejemplo",
      start: new Date(),
      end: new Date(),
      allDay: true,
      description: "Descripción del evento de ejemplo",
      promoCode: "PROMO123",
      facebook: "https://facebook.com/event",
      instagram: "https://instagram.com/event",
      twitter: "https://twitter.com/event"
    },
  ]);

  const navigate = useNavigate();

  // Función para manejar la adición de un nuevo evento
  const handleAddEvent = (values) => {
    const newEvent = {
      title: values.title,
      start: new Date(values.start),
      end: new Date(values.end),
      description: values.description,
      promoCode: values.promoCode || 'N/A',
      facebook: values.facebook || '',
      instagram: values.instagram || '',
      twitter: values.twitter || ''
    };
    // Actualizamos el estado de events con el nuevo evento
    setEvents([...events, newEvent]);
  };

  // Función para manejar la selección de un evento
  const handleSelectEvent = (event) => {
    const eventIndex = events.indexOf(event);
    navigate(`/evento/${eventIndex}`);
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
        onSelectEvent={handleSelectEvent}
      />
      <h2>Añadir un nuevo evento</h2>
      {/* Pasamos la función handleAddEvent al formulario como prop */}
      <AddEventForm onSubmit={handleAddEvent} />
    </div>
  );
};

export default CalendarPage;
