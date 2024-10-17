import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flex, Box, Button, Menu, MenuButton, MenuList, MenuItem, Avatar, Text } from '@chakra-ui/react';
import { auth } from '../firebaseConfig';

const Navbar = ({ user, userRole, setUserRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para manejar el hover
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUserRole(null);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Flex justify="space-between" align="center" p={4} bg="gray.800" color="white">
      <Link to="/">
        <Text fontSize="lg" fontWeight="bold" color="orange.400">Eventos de Motos</Text>
      </Link>

      <Flex align="center" gap={5}>
        <Link to="/calendario">
          <Text color="white">Calendario</Text>
        </Link>

        {userRole === 'organizer' && (
          <Link to="/formulario">
            <Text color="white">Añadir evento</Text>
          </Link>
        )}

        {user ? (
          <Menu isOpen={isMenuOpen}>
            <MenuButton
              as={Button}
              variant="link"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <Flex align="center">
                <Avatar size="sm" src={user.photoURL || ''} mr={2} />
                <Text>{user.displayName || 'Tu perfil'}</Text>
              </Flex>
            </MenuButton>
            <MenuList
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <MenuItem onClick={() => navigate('/profile')} color={'black'}>Mi perfil</MenuItem>
              <MenuItem onClick={handleLogout} color={'black'}>Cerrar sesión</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button as={Link} to="/login" colorScheme="orange" variant="outline">
            Iniciar sesión
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
