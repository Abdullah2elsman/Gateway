import PropTypes from "prop-types";
import { Button, Box, Typography } from "@mui/material";

const ConfirmDelete = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          background: "#fff",
          padding: "25px",
          width: "420px",
          borderRadius: "10px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "15px" }}>
          Are you sure?
        </Typography>

        <Typography sx={{ marginBottom: "25px", fontSize: "15px" }}>
          Do you really want to delete this record? This action cannot be undone.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="contained" color="error" onClick={onConfirm}>
            Delete
          </Button>
        </Box>
      </Box>
    </div>
  );
};

ConfirmDelete.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default ConfirmDelete;
