import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Input,
  Button,
  FormLabel,
  FormControl,
  Heading,
  VStack,
  Text,
  Stack
} from '@chakra-ui/react';

const LoginPage = ({ setUserRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('user');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      // Crear la cuenta sin iniciar sesión automáticamente
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Si es organizador, guardar la información adicional (puedes implementar la lógica en tu base de datos)
      if (role === 'organizer') {
        // Guardar información adicional si es necesario
      }

      // Enviar correo de verificación
      await sendEmailVerification(user);
      setError('Te hemos enviado un correo de verificación. Por favor, revisa tu bandeja de entrada.');

      // Cerrar sesión para evitar el acceso hasta la verificación
      await auth.signOut();

      setUserRole(null);
      setIsCreatingAccount(false); // Volver a la pantalla de inicio de sesión
    } catch (err) {
      setError('Error al crear la cuenta: ' + err.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Verificar si el email ha sido verificado antes de permitir el acceso
      if (!user.emailVerified) {
        setError('Debes verificar tu correo electrónico antes de acceder.');
        await auth.signOut(); // Cerrar sesión si se ha iniciado automáticamente sin verificar
        return;
      }

      // Establecer el rol basado en el estado de la cuenta (puedes ajustar la lógica según tu base de datos)
      if (role === 'organizer') {
        setUserRole('organizer');
      } else {
        setUserRole('user');
      }

      navigate('/');
    } catch (err) {
      setError('Error al iniciar sesión: ' + err.message);
    }
  };

  return (
    <Box p={8} maxW="400px" mx="auto" mt={12} bg="rgba(255, 255, 255, 0.9)" borderRadius="lg" boxShadow="lg" border="1px solid rgba(0,0,0,0.1)" textAlign="center">
      <Heading mb={6} textAlign="center" fontSize="2xl" color="orange.400">
        {isCreatingAccount ? 'Crear una cuenta' : 'Iniciar sesión'}
      </Heading>
      {error && <Text color="red.500" mb={4}>{error}</Text>}
      <VStack spacing={5}>
        <FormControl>
          <FormLabel fontSize="sm" color="gray.800">Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo"
            bg="white"
            size="md"
            color="gray.800"
            _placeholder={{ color: 'gray.500' }}
            borderColor="gray.300"
            _hover={{ borderColor: 'orange.400' }}
            focusBorderColor="orange.400"
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm" color="gray.800">Contraseña</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            bg="white"
            size="md"
            color="gray.800"
            _placeholder={{ color: 'gray.500' }}
            borderColor="gray.300"
            _hover={{ borderColor: 'orange.400' }}
            focusBorderColor="orange.400"
          />
        </FormControl>

        {isCreatingAccount && (
          <>
            <FormControl>
              <FormLabel fontSize="sm" color="gray.800">Selecciona tu tipo de cuenta</FormLabel>
              <Stack direction="row" spacing={4} justify="center">
                <Button
                  colorScheme={role === 'user' ? 'orange' : 'gray'}
                  onClick={() => setRole('user')}
                  variant={role === 'user' ? 'solid' : 'outline'}
                >
                  Usuario común
                </Button>
                <Button
                  colorScheme={role === 'organizer' ? 'orange' : 'gray'}
                  onClick={() => setRole('organizer')}
                  variant={role === 'organizer' ? 'solid' : 'outline'}
                >
                  Organizador
                </Button>
              </Stack>
            </FormControl>

            {role === 'organizer' && (
              <FormControl>
                <FormLabel fontSize="sm" color="gray.800">Organización o empresa</FormLabel>
                <Input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Ingresa la organización a la que perteneces"
                  bg="white"
                  size="md"
                  color="gray.800"
                  _placeholder={{ color: 'gray.500' }}
                  borderColor="gray.300"
                  _hover={{ borderColor: 'orange.400' }}
                  focusBorderColor="orange.400"
                />
              </FormControl>
            )}
          </>
        )}

        {isCreatingAccount ? (
          <Button onClick={handleSignUp} colorScheme="orange" width="full" size="lg" borderRadius="md">
            Crear cuenta
          </Button>
        ) : (
          <Button onClick={handleLogin} colorScheme="orange" width="full" size="lg" borderRadius="md">
            Iniciar sesión
          </Button>
        )}

        <Button variant="link" onClick={() => setIsCreatingAccount(!isCreatingAccount)} color="orange.400" mt={4}>
          {isCreatingAccount ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Regístrate'}
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
