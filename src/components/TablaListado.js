import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableRow, TableCell, TablePagination } from '@mui/material';

const TablaListado = () => {
  const data = useSelector(state => state.data); // Obtén los datos del estado de Redux

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
  console.log('Data:', data);
  const filteredData = data.filter(item => {
    return (
      item.nombre.toLowerCase().includes(filters.keyword.toLowerCase()) &&
      item.categoria.toLowerCase().includes(filters.category.toLowerCase())
    );
  });

  const paginatedData = filteredData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
    <div>
      <div>
        <label htmlFor="keyword">Keyword:</label>
        <input
          type="text"
          id="keyword"
          name="keyword"
          value={filters.keyword}
          onChange={handleFilterChange}
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        />
      </div>
      <Table>
        <TableBody>
          {paginatedData.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.categoria}</TableCell>
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

