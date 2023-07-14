import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification, hideNotification } from '../store/reducers/notificationSlice';
import { Button, TextField, Snackbar } from '@mui/material';

const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar el formulario

    // Mostrar notificación
    dispatch(showNotification('Formulario enviado correctamente'));

    // Limpiar el campo de nombre
    setNombre('');
  };

  const handleSnackbarClose = () => {
    dispatch(hideNotification());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Enviar</Button>
      </form>
      <Snackbar open={!!notification} autoHideDuration={3000} onClose={handleSnackbarClose} message={notification} />
    </div>
  );
};

export default Formulario;

