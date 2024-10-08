// src/components/AddEventForm.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorMessage,
  VStack
} from '@chakra-ui/react';

const AddEventForm = ({ onSubmit }) => {
  const navigate = useNavigate(); // Hook para redirigir

  const initialValues = {
    title: '',
    start: '',
    end: '',
    description: '',
    promoCode: '',
    facebook: '',
    instagram: '',
    twitter: ''
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('El título es obligatorio'),
    start: Yup.date().required('La fecha de inicio es obligatoria'),
    end: Yup.date().required('La fecha de fin es obligatoria'),
    description: Yup.string().required('La descripción es obligatoria'),
    promoCode: Yup.string(),
    facebook: Yup.string().url('URL inválida'),
    instagram: Yup.string().url('URL inválida'),
    twitter: Yup.string().url('URL inválida')
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values); // Llamamos a la función para agregar el evento
        navigate('/calendario'); // Redirigimos a la página del calendario
      }}
    >
      {({ handleSubmit, errors, touched }) => (
        <Box
          as="form"
          onSubmit={handleSubmit}
          p={5}
          maxW="600px"
          mx="auto"
          boxShadow="md"
          borderRadius="md"
        >
          <VStack spacing={4}>
            <FormControl isInvalid={errors.title && touched.title}>
              <FormLabel htmlFor="title">Título</FormLabel>
              <Field as={Input} id="title" name="title" />
              <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.start && touched.start}>
              <FormLabel htmlFor="start">Fecha de inicio</FormLabel>
              <Field as={Input} id="start" name="start" type="datetime-local" />
              <FormErrorMessage>{errors.start}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.end && touched.end}>
              <FormLabel htmlFor="end">Fecha de fin</FormLabel>
              <Field as={Input} id="end" name="end" type="datetime-local" />
              <FormErrorMessage>{errors.end}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.description && touched.description}>
              <FormLabel htmlFor="description">Descripción del evento</FormLabel>
              <Field as={Textarea} id="description" name="description" />
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="promoCode">Código promocional (opcional)</FormLabel>
              <Field as={Input} id="promoCode" name="promoCode" />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="facebook">Facebook (opcional)</FormLabel>
              <Field as={Input} id="facebook" name="facebook" type="url" />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="instagram">Instagram (opcional)</FormLabel>
              <Field as={Input} id="instagram" name="instagram" type="url" />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="twitter">Twitter (opcional)</FormLabel>
              <Field as={Input} id="twitter" name="twitter" type="url" />
            </FormControl>

            <Button type="submit" colorScheme="blue" width="full">
              Añadir evento
            </Button>
          </VStack>
        </Box>
      )}
    </Formik>
  );
};

export default AddEventForm;
