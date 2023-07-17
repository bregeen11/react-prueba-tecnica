import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification, hideNotification, notifyClientUpdated, clientUpdated } from '../store/reducers/notificationSlice';
import { Button, TextField, Select, MenuItem, Snackbar, RadioGroup, FormControlLabel, Radio, Checkbox, Slider } from '@mui/material';
import { addCliente, updateCliente, setSelectedCliente } from '../store/reducers/dataSlice'; // Importar las acciones addCliente, updateCliente y setSelectedCliente desde dataSlice
import { clearFilters } from '../store/reducers/filterSlice';


const Formulario = () => {
  const dispatch = useDispatch();
  const selectedCliente = useSelector((state) => state.data.selectedCliente);
  const notification = useSelector((state) => state.notification);

  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [edad, setEdad] = useState(18);
  const [genero, setGenero] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  useEffect(() => {
    // Cargar los datos del cliente seleccionado en el formulario cuando se seleccione
    if (selectedCliente) {
      setNombre(selectedCliente.nombre);
      setCategoria(selectedCliente.categoria);
      setEdad(selectedCliente.edad);
      setGenero(selectedCliente.genero);
      setAceptaTerminos(selectedCliente.aceptaTerminos);
    } else {
      // Limpiar los campos del formulario si no hay cliente seleccionado
      setNombre('');
      setCategoria('');
      setEdad(18);
      setGenero('');
      setAceptaTerminos(false);
    }
  }, [selectedCliente]);

  const loadSelectedClienteData = () => {
    if (selectedCliente) {
      setNombre(selectedCliente.nombre);
      setCategoria(selectedCliente.categoria);
      setEdad(selectedCliente.edad);
      setGenero(selectedCliente.genero);
      setAceptaTerminos(selectedCliente.aceptaTerminos);
      dispatch(showNotification('Cliente seleccionado para edición'));
    }
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (selectedCliente) {
      dispatch(updateCliente({
        ...selectedCliente,
        nombre,
        categoria,
        edad,
        genero,
        aceptaTerminos
      }));
      dispatch(showNotification(notifyClientUpdated));
    } else {
      dispatch(addCliente({
        nombre,
        categoria,
        edad,
        genero,
        aceptaTerminos
      }));
      dispatch(showNotification('Formulario enviado correctamente'));
    }
    dispatch(clearFilters());
    setNombre('');
    setCategoria('');
    setEdad(18);
    setGenero('');
    setAceptaTerminos(false);
    setSelectedCliente(null); // Limpiar el cliente seleccionado después de enviar el formulario
  };

  const handleSnackbarClose = () => {
    dispatch(hideNotification());
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
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
          {selectedCliente ? 'Actualizar Cliente' : 'Enviar formulario'}
        </Button>
      </form>
      <Snackbar open={!!notification} autoHideDuration={3000} onClose={handleSnackbarClose} message={notification?.message || ''} />
    </div>
  );
};

export default Formulario;


