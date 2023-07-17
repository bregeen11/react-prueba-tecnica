import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { showNotification, hideNotification } from '../store/reducers/notificationSlice';
import { setSelectedCliente } from '../store/reducers/dataSlice';
import { clearFilters } from '../store/reducers/filterSlice';

import Snackbar from '@mui/material/Snackbar'; // Importar el componente Snackbar

const TablaDataGrid = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const filters = useSelector((state) => state.filter);
  const notification = useSelector((state) => state.notification); // Agregar la variable notification

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCliente, setSelectedCliente] = useState(null);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'categoria', headerName: 'Categoría', width: 200 },
    { field: 'edad', headerName: 'Edad', width: 100 },
    { field: 'genero', headerName: 'Género', width: 120 },
    { field: 'aceptaTerminos', headerName: 'Acepta Términos', width: 160 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => {
        const cliente = params.row;
        return (
          <>
            {/* Botón Modificar */}
            <button onClick={() => handleUpdateCliente(cliente)}>
              Modificar
            </button>
          </>
        );
      },
    },
  ];

  const pageSize = 10;

  const filteredData = data.filter((item) => {
    const keywordMatch = item.nombre
      .toLowerCase()
      .includes(filters.keyword.toLowerCase());
    const categoryMatch = item.categoria
      .toLowerCase()
      .includes(filters.category.toLowerCase());
    return keywordMatch && categoryMatch;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleUpdateCliente = (cliente) => {
    setSelectedCliente(cliente);
    // loadSelectedClienteData(); // Esta función no se necesita aquí, ya que se encuentra en el componente Formulario
    dispatch(showNotification('Cliente seleccionado para edición'));
    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
      dispatch(hideNotification());
    }, 3000);
  };

  useEffect(() => {
    setCurrentPage(1); // Ajustar la página actual a 1 cuando cambian los filtros o los datos
  }, [filters, data]);

  const handleSnackbarClose = () => {
    dispatch(hideNotification());
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={paginatedData}
        columns={columns}
        pageSize={pageSize}
        checkboxSelection
        rowCount={filteredData.length}
        pagination
        onPageChange={(params) => setCurrentPage(params.page)}
        components={{
          Toolbar: GridToolbar,
        }}
        // Actualizar el cliente seleccionado cuando se haga clic en una fila
        onRowClick={(params) => {
          setSelectedCliente(params.row);
          // loadSelectedClienteData(); // Esta función no se necesita aquí, ya que se encuentra en el componente Formulario
          // Mostrar notificación de cliente seleccionado para edición
          dispatch(showNotification('Cliente seleccionado para edición'));
          // Ocultar la notificación después de 3 segundos
          setTimeout(() => {
            dispatch(hideNotification());
          }, 3000);
        }}
      />
      <Snackbar open={!!notification} autoHideDuration={3000} onClose={handleSnackbarClose} message={notification?.message || ''} />
    </div>
  );
};

export default TablaDataGrid;

