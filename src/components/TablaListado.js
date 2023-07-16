import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableRow, TableCell, TablePagination, TextField } from '@mui/material';
import { updateCliente, deleteCliente } from '../store/reducers/dataSlice';

const TablaListado = () => {
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    keyword: '',
    category: ''
  });

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
    setCurrentPage(0);
  };

  const filteredData = Array.isArray(data)
    ? data.filter(item => {
        return (
          item.nombre.toLowerCase().includes(filters.keyword.toLowerCase()) &&
          item.categoria.toLowerCase().includes(filters.category.toLowerCase())
        );
      })
    : [];

  const paginatedData = filteredData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const handleUpdateCliente = (event, clienteId) => {
    const { name, value } = event.target;
    dispatch(updateCliente({ id: clienteId, [name]: value }));
  };

  const handleDeleteCliente = (clienteId) => {
    dispatch(deleteCliente(clienteId));
  };

  return (
    <div>
      <div>
        <label htmlFor="keyword">Keyword:</label>
        <TextField
          type="text"
          id="keyword"
          name="keyword"
          value={filters.keyword}
          onChange={handleFilterChange}
          fullWidth  // Agrega esta propiedad para que el TextField ocupe todo el ancho disponible
          margin="normal"  // Ajusta el margen del TextField
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <TextField
          type="text"
          id="category"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          fullWidth  // Agrega esta propiedad para que el TextField ocupe todo el ancho disponible
          margin="normal"  // Ajusta el margen del TextField
        />
      </div>
      <Table>
        <TableBody>
          {paginatedData.map(item => (
            <TableRow key={item.id}>
              <TableCell>
                <TextField
                  type="text"
                  name="nombre"
                  value={item.nombre}
                  onChange={(event) => handleUpdateCliente(event, item.id)}
                  fullWidth  // Agrega esta propiedad para que el TextField ocupe todo el ancho disponible
                  margin="none"  // Elimina el margen del TextField
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="text"
                  name="categoria"
                  value={item.categoria}
                  onChange={(event) => handleUpdateCliente(event, item.id)}
                  fullWidth  // Agrega esta propiedad para que el TextField ocupe todo el ancho disponible
                  margin="none"  // Elimina el margen del TextField
                />
              </TableCell>
              <TableCell>
                <button onClick={() => handleDeleteCliente(item.id)}>Eliminar</button>
              </TableCell>
              {/* Más celdas de datos */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredData.length}
        page={currentPage}
        onPageChange={handlePageChange}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handlePageSizeChange}
      />
    </div>
  );
};

export default TablaListado;





