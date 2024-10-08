// src/components/AddEventForm.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddEventForm = ({ onSubmit }) => {
  const initialValues = {
    title: '',
    start: '',
    end: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('El título es obligatorio'),
    start: Yup.date().required('La fecha de inicio es obligatoria'),
    end: Yup.date().required('La fecha de fin es obligatoria'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <label htmlFor="title">Título</label>
          <Field name="title" type="text" />
          <ErrorMessage name="title" component="div" />
        </div>
        <div>
          <label htmlFor="start">Fecha de inicio</label>
          <Field name="start" type="datetime-local" />
          <ErrorMessage name="start" component="div" />
        </div>
        <div>
          <label htmlFor="end">Fecha de fin</label>
          <Field name="end" type="datetime-local" />
          <ErrorMessage name="end" component="div" />
        </div>
        <button type="submit">Añadir evento</button>
      </Form>
    </Formik>
  );
};

export default AddEventForm;
