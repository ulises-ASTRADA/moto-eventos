import React from 'react';
import { Box, Heading, Text, List, ListItem, Link } from '@chakra-ui/react';

const MainPage = ({ events }) => {
  return (
    <Box p={5}>
      <Heading as="h1" mb={4} color="orange.400">Moto Eventos</Heading>
      <Text fontSize="lg" mb={6}>
        Bienvenido a la plataforma donde puedes ver y organizar eventos de motos.
      </Text>

      <Box>
        <Heading as="h2" fontSize="xl" mb={4} color="orange.300">Próximos eventos</Heading>
        {events.length > 0 ? (
          <List spacing={3}>
            {events.map((event, index) => (
              <ListItem key={index} borderWidth="1px" borderRadius="md" p={4} borderColor="gray.700">
                <strong>{event.title}</strong> - {new Date(event.start).toLocaleDateString()}
              </ListItem>
            ))}
          </List>
        ) : (
          <Text>No hay eventos disponibles por ahora.</Text>
        )}
      </Box>
    </Box>
  );
};

export default MainPage;
