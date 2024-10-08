import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Link, List, ListItem } from '@chakra-ui/react';

const EventDetailsPage = ({ events }) => {
  const { eventId } = useParams();  // Obtiene el ID del evento desde la URL
  const event = events[parseInt(eventId, 10)];  // Busca el evento por su índice

  if (!event) {
    return <Heading as="h2">Evento no encontrado</Heading>;
  }

  return (
    <Box p={5}>
      <Heading as="h1" mb={4}>{event.title}</Heading>
      <Text fontSize="lg" mb={4}><strong>Descripción:</strong> {event.description}</Text>
      <Text mb={4}><strong>Fecha de inicio:</strong> {new Date(event.start).toLocaleString()}</Text>
      <Text mb={4}><strong>Fecha de fin:</strong> {new Date(event.end).toLocaleString()}</Text>
      <Text mb={4}><strong>Código promocional:</strong> {event.promoCode}</Text>
      <Heading as="h3" fontSize="lg" mb={3}>Redes sociales</Heading>
      <List spacing={3}>
        {event.facebook && <ListItem><Link href={event.facebook} isExternal>Facebook</Link></ListItem>}
        {event.instagram && <ListItem><Link href={event.instagram} isExternal>Instagram</Link></ListItem>}
        {event.twitter && <ListItem><Link href={event.twitter} isExternal>Twitter</Link></ListItem>}
      </List>
    </Box>
  );
};

export default EventDetailsPage;
