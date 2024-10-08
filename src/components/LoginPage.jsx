import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import {
  Box,
  Input,
  Button,
  FormLabel,
  FormControl,
  Heading,
  VStack,
  Text,
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react';

const LoginPage = ({ setUserRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('user');  // Estado para manejar el rol seleccionado
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Manejar el inicio de sesión
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (email === 'organizador@correo.com') {
        setUserRole('organizer');
      } else {
        setUserRole('user');
      }

      navigate('/');  // Redirigir después de log-in
    } catch (err) {
      setError('Error al iniciar sesión: ' + err.message);
    }
  };

  // Manejar el registro de una nueva cuenta
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (role === 'organizer') {
        console.log('Organización:', organization);
      }

      setUserRole(role);
      navigate('/');
    } catch (err) {
      setError('Error al crear la cuenta: ' + err.message);
    }
  };

  return (
    <Box
      p={8}
      maxW="400px"
      mx="auto"
      mt={12}
      bg="rgba(255, 255, 255, 0.9)"  // Fondo translúcido
      borderRadius="lg"
      boxShadow="lg"
      border="1px solid rgba(0,0,0,0.1)"
      textAlign="center"
    >
      <Heading mb={6} textAlign="center" fontSize="2xl" color="orange.400"> {/* Naranja como en MainPage */}
        {isCreatingAccount ? 'Crear una cuenta' : 'Iniciar sesión'}
      </Heading>
      {error && <Text color="red.500" mb={4}>{error}</Text>}
      <VStack spacing={5}>
        <FormControl>
          <FormLabel fontSize="sm" color="gray.800">Email</FormLabel> {/* Texto en gris oscuro */}
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo"
            bg="white"
            size="md"
            color="gray.800"  // Texto del input en gris oscuro
            _placeholder={{ color: 'gray.500' }}  // Placeholder en gris claro
            borderColor="gray.300"
            _hover={{ borderColor: 'orange.400' }}  // Naranja claro al hover
            focusBorderColor="orange.400"  // Naranja claro al hacer foco
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm" color="gray.800">Contraseña</FormLabel> {/* Texto en gris oscuro */}
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            bg="white"
            size="md"
            color="gray.800"  // Texto del input en gris oscuro
            _placeholder={{ color: 'gray.500' }}  // Placeholder en gris claro
            borderColor="gray.300"
            _hover={{ borderColor: 'orange.400' }}  // Naranja claro al hover
            focusBorderColor="orange.400"  // Naranja claro al hacer foco
          />
        </FormControl>

        {/* Mostrar la selección de rol solo al crear una cuenta */}
        {isCreatingAccount && (
          <>
            <FormControl>
              <FormLabel fontSize="sm" color="gray.800">Selecciona tu tipo de cuenta</FormLabel>
              <RadioGroup onChange={setRole} value={role}>
                <Stack direction="row" spacing={5}>
                  <Radio value="user">Usuario común</Radio>
                  <Radio value="organizer">Organizador</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            {/* Mostrar campos adicionales si el rol es 'organizer' */}
            {role === 'organizer' && (
              <FormControl>
                <FormLabel fontSize="sm" color="gray.800">Organización</FormLabel>
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
