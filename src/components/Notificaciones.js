import React from 'react';
import { useSelector } from 'react-redux';
import { Snackbar } from '@mui/material';

const Notificaciones = () => {
  const notification = useSelector(state => state.notification);

  const handleSnackbarClose = () => {
    // Ocultar la notificación
  };

  return (
    <Snackbar
      open={!!notification}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
      message={notification}
    />
  );
};

export default Notificaciones;

