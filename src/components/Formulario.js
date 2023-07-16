import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification, hideNotification } from '../store/reducers/notificationSlice';
import { Button, TextField, Select, MenuItem, Snackbar, RadioGroup, FormControlLabel, Radio, Checkbox, Slider } from '@mui/material';
import { addCliente } from '../store/reducers/dataSlice';
import { clearFilters } from '../store/reducers/filterSlice';

const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [edad, setEdad] = useState(18); // Valor inicial de la edad
  const [genero, setGenero] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulario renderizado');
    // Lógica para enviar el formulario

    // Agregar el nuevo cliente con los nuevos campos
    dispatch(addCliente({ nombre, categoria, edad, genero, correo: '' }));

    // Limpiar filtros
    dispatch(clearFilters());

    // Mostrar notificación
    dispatch(showNotification('Formulario enviado correctamente'));

    // Limpiar los campos del formulario después de mostrar la notificación
    setNombre('');
    setCategoria('');
    setEdad(18);
    setGenero('');
    setAceptaTerminos(false);
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
          fullWidth
          margin="normal"
        />
        <Select
          value={categoria}
          onChange={(event) => setCategoria(event.target.value)}
          label="Categoría"
          fullWidth
        >
          <MenuItem value="Categoria 1">Categoria 1</MenuItem>
          <MenuItem value="Categoria 2">Categoria 2</MenuItem>
          <MenuItem value="Categoria 3">Categoria 3</MenuItem>
        </Select>
        {/* Campo de edad */}
        <Slider
          value={edad}
          onChange={(event, value) => setEdad(value)}
          valueLabelDisplay="auto"
          marks
          step={1}
          min={18}
          max={100}
        />
        {/* Campo de género */}
        <RadioGroup
          value={genero}
          onChange={(event) => setGenero(event.target.value)}
        >
          <FormControlLabel value="Femenino" control={<Radio />} label="Femenino" />
          <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
        </RadioGroup>
        {/* Campo para aceptar los términos */}
        <FormControlLabel
          control={
            <Checkbox
              checked={aceptaTerminos}
              onChange={(event) => setAceptaTerminos(event.target.checked)}
              color="primary"
            />
          }
          label="Acepto los términos y condiciones"
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar formulario
        </Button>
      </form>
      <Snackbar open={!!notification} autoHideDuration={3000} onClose={handleSnackbarClose} message={notification} />
    </div>
  );
};

export default Formulario;








