import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { clearFilters } from '../store/reducers/filterSlice';
import { showNotification, hideNotification, clearNotification, clientDeleted } from '../store/reducers/notificationSlice';
import { deleteCliente } from '../store/reducers/dataSlice';

const TablaDataGrid = () => {
  console.log('TablaDataGrid renderizado');
  const dispatch = useDispatch();
  const data = useSelector(state => state.data.data); // Obtener los datos directamente del estado data

  const filters = useSelector(state => state.filter);
  const notification = useSelector(state => state.notification);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'categoria', headerName: 'Categoría', width: 200 },
    { field: 'edad', headerName: 'Edad', width: 100 },
    { field: 'genero', headerName: 'Género', width: 120 },
    { field: 'aceptaTerminos', headerName: 'Acepta Términos', width: 160 },
    // Agrega más columnas según los campos adicionales que necesites
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filteredData = data.filter(item => {
    const keywordMatch = item.nombre.toLowerCase().includes(filters.keyword.toLowerCase());
    const categoryMatch = item.categoria.toLowerCase().includes(filters.category.toLowerCase());
    return keywordMatch && categoryMatch;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  console.log('Data:', data);
  console.log('currentPage:', currentPage);
  console.log('pageSize:', pageSize);
  console.log('filteredData:', filteredData);
  console.log('paginatedData:', paginatedData);

  const handleDeleteCliente = (clienteId) => {
    // Lógica para eliminar un cliente
    dispatch(deleteCliente(clienteId));

    // Mostrar notificación de cliente eliminado
    dispatch(showNotification(clientDeleted()));

    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
      dispatch(hideNotification());
    }, 3000);
  };

  useEffect(() => {
    setCurrentPage(1); // Ajustamos la página actual a 1 cuando cambian los filtros o los datos
  }, [filters, data]);

  useEffect(() => {
    // Limpiar la notificación cuando el componente se desmonte o cuando cambien los filtros o los datos
    return () => {
      dispatch(clearNotification());
    };
  }, [filters, data, dispatch]);

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
      />
    </div>
  );
};

export default TablaDataGrid;

