// src/components/EventDetailsPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetailsPage = ({ events }) => {
  const { eventId } = useParams();
  const event = events.find((e, index) => index.toString() === eventId);

  if (!event) {
    return <h2>Evento no encontrado</h2>;
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p><strong>Descripción:</strong> {event.description}</p>
      <p><strong>Fecha de inicio:</strong> {new Date(event.start).toLocaleString()}</p>
      <p><strong>Fecha de fin:</strong> {new Date(event.end).toLocaleString()}</p>
      <p><strong>Código promocional:</strong> {event.promoCode}</p>
      <p><strong>Redes sociales:</strong></p>
      <ul>
        {event.facebook && <li><a href={event.facebook}>Facebook</a></li>}
        {event.instagram && <li><a href={event.instagram}>Instagram</a></li>}
        {event.twitter && <li><a href={event.twitter}>Twitter</a></li>}
      </ul>
    </div>
  );
};

export default EventDetailsPage;
