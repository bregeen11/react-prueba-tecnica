import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showNotification,
  hideNotification,
  notifyClientUpdated,
  notifyClientDeleted,
} from "../store/reducers/notificationSlice";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Slider,
} from "@mui/material";
import {
  addCliente,
  updateCliente,
  setSelectedCliente,
  deleteCliente,
} from "../store/reducers/dataSlice";
import { clearFilters } from "../store/reducers/filterSlice";

const Formulario = () => {
  const dispatch = useDispatch();
  const selectedCliente = useSelector((state) => state.data.selectedCliente);
  const notification = useSelector((state) => state.notification);

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [edad, setEdad] = useState(18);
  const [genero, setGenero] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const resetForm = useCallback(() => {
    setNombre("");
    setCategoria("");
    setEdad(18);
    setGenero("");
    setAceptaTerminos(false);
    dispatch(setSelectedCliente(null));
  }, [dispatch]);

  useEffect(() => {
    if (selectedCliente) {
      setNombre(selectedCliente.nombre);
      setCategoria(selectedCliente.categoria);
      setEdad(selectedCliente.edad);
      setGenero(selectedCliente.genero);
      setAceptaTerminos(selectedCliente.aceptaTerminos);
    } else {
      resetForm();
    }
  }, [selectedCliente, resetForm]);

  const handleSubmitForm = useCallback(
    (event) => {
      event.preventDefault();
      if (selectedCliente) {
        dispatch(
          updateCliente({
            ...selectedCliente,
            nombre,
            categoria,
            edad,
            genero,
            aceptaTerminos,
          })
        );
        dispatch(showNotification(notifyClientUpdated));
      } else {
        dispatch(
          addCliente({ nombre, categoria, edad, genero, aceptaTerminos })
        );
        dispatch(showNotification("Formulario enviado correctamente"));
      }
      dispatch(clearFilters());
      resetForm();
    },
    [
      selectedCliente,
      nombre,
      categoria,
      edad,
      genero,
      aceptaTerminos,
      dispatch,
      resetForm,
    ]
  );

  const handleDeleteCliente = useCallback(() => {
    if (selectedCliente) {
      dispatch(deleteCliente(selectedCliente.id));
      dispatch(showNotification(notifyClientDeleted));
    }
  }, [selectedCliente, dispatch]);

  const handleSnackbarClose = useCallback(() => {
    dispatch(hideNotification());
  }, [dispatch]);

  return (
    <div className="form-container">
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
        <Slider
          value={edad}
          onChange={(event, value) => setEdad(value)}
          valueLabelDisplay="auto"
          marks
          step={1}
          min={18}
          max={100}
        />
        <RadioGroup
          value={genero}
          onChange={(event) => setGenero(event.target.value)}
        >
          <FormControlLabel
            value="Femenino"
            control={<Radio />}
            label="Femenino"
          />
          <FormControlLabel
            value="Masculino"
            control={<Radio />}
            label="Masculino"
          />
        </RadioGroup>
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
        <Button
          type="submit"
          variant="contained"
          className="custom-button custom-button-primary"
        >
          {selectedCliente ? "Actualizar Cliente" : "Enviar formulario"}
        </Button>
        {selectedCliente && (
          <Button
            onClick={handleDeleteCliente}
            className="custom-button custom-button-secondary"
          >
            Eliminar Cliente
          </Button>
        )}
      </form>
      <Snackbar
        key={notification?.message || ""}
        open={!!notification}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={notification?.message || ""}
      />
    </div>
  );
};

export default Formulario;
