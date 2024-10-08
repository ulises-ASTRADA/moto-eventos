import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';  // Importa los estilos de react-datepicker
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorMessage,
  VStack,
  Heading
} from '@chakra-ui/react';

const AddEventForm = ({ onSubmit }) => {
  const navigate = useNavigate();  // Hook para la redirección

  // Estados para las fechas
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const initialValues = {
    title: '',
    description: '',
    promoCode: '',
    facebook: '',
    instagram: '',
    twitter: '',
    website: ''
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('El título es obligatorio'),
    description: Yup.string().required('La descripción es obligatoria'),
    promoCode: Yup.string(),
    facebook: Yup.string().url('URL inválida'),
    instagram: Yup.string().url('URL inválida'),
    twitter: Yup.string().url('URL inválida'),
    website: Yup.string().url('URL inválida')
  });

  const handleSubmit = async (values, actions) => {
    const eventDetails = {
      ...values,
      start: startDate,  // Agregamos la fecha de inicio
      end: endDate       // Agregamos la fecha de fin
    };

    await onSubmit(eventDetails);  // Llama a la función que agrega el evento
    actions.setSubmitting(false);  // Desactiva el estado de "enviando"
    navigate('/calendario');  // Redirige a la página del calendario
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
          <Heading as="h1" mb={6}>Añadir nuevo evento</Heading>
          <VStack spacing={4}>
            <FormControl isInvalid={errors.title && touched.title}>
              <FormLabel htmlFor="title">Título</FormLabel>
              <Field as={Input} id="title" name="title" />
              <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="start">Fecha de inicio</FormLabel>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd/MM/yyyy HH:mm"  // Formato dd/MM/yyyy para las fechas
                placeholderText="Selecciona la fecha de inicio"
                customInput={<Input />}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="end">Fecha de fin</FormLabel>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd/MM/yyyy HH:mm"  // Formato dd/MM/yyyy para las fechas
                placeholderText="Selecciona la fecha de fin"
                customInput={<Input />}
              />
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

            <FormControl>
              <FormLabel htmlFor="website">Pagina web (opcional)</FormLabel>
              <Field as={Input} id="website" name="website" type="url" />
            </FormControl>


            <Button type="submit" colorScheme="orange" width="full">
              Añadir evento
            </Button>
          </VStack>
        </Box>
      )}
    </Formik>
  );
};

export default AddEventForm;
