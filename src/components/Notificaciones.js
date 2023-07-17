import React from "react";
import { useSelector } from "react-redux";
import { Snackbar } from "@mui/material";

const Notificaciones = () => {
  const notification = useSelector((state) => state.notification);

  return (
    <Snackbar
      open={!!notification?.message}
      autoHideDuration={3000}
      onClose={() => {}}
      message={notification?.message || ""}
    />
  );
};

export default Notificaciones;
