import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  showNotification,
  hideNotification,
} from "../store/reducers/notificationSlice";
import {
  setSelectedCliente,
  deleteCliente,
  notifyClientDeleted,
} from "../store/reducers/dataSlice";
import { clearFilters } from "../store/reducers/filterSlice";

import { Button, Snackbar, Typography } from "@mui/material";

const TablaDataGrid = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const filters = useSelector((state) => state.filter);
  const notification = useSelector((state) => state.notification);

  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nombre", headerName: "Nombre", width: 200 },
    { field: "categoria", headerName: "Categoría", width: 200 },
    { field: "edad", headerName: "Edad", width: 100 },
    { field: "genero", headerName: "Género", width: 120 },
    { field: "aceptaTerminos", headerName: "Acepta Términos", width: 160 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 250,
      renderCell: (params) => {
        const cliente = params.row;
        return (
          <>
            <Button
              onClick={() => handleUpdateCliente(cliente)}
              className="custom-button custom-button-primary"
            >
              Modificar
            </Button>
            <Button
              onClick={() => handleDeleteCliente(cliente)}
              className="custom-button custom-button-secondary custom-button-separate"
            >
              Eliminar
            </Button>
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
    dispatch(setSelectedCliente(cliente));
  };

  const handleDeleteCliente = (cliente) => {
    dispatch(deleteCliente(cliente.id));
    dispatch(showNotification(notifyClientDeleted));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, data]);

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleSnackbarClose = () => {
    dispatch(hideNotification());
  };

  const pageSizeOptions = [5, 10, 25, 50, 100];

  return (
    <div className="table-container">
      <Button
        onClick={handleClearFilters}
        className="custom-button custom-button-secondary"
      >
        Limpiar Filtros
      </Button>
      <div className="total-pages-container">
        <Typography variant="body1" className="total-pages-text">
          Total de páginas: {totalPages}
        </Typography>
      </div>
      <DataGrid
        rows={paginatedData}
        columns={columns}
        pageSize={pageSize}
        checkboxSelection
        rowCount={filteredData.length}
        pagination
        onPageChange={(params) => setCurrentPage(params.page)}
        pageSizeOptions={pageSizeOptions}
        defaultPageSize={5}
        components={{
          Toolbar: GridToolbar,
        }}
      />
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

export default TablaDataGrid;
