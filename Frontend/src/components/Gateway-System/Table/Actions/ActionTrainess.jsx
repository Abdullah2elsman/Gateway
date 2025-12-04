import propTypes from "prop-types";
import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ActionTrainess = ({ row, closeMenu }) => {
  const navigate = useNavigate();

  const GoToView = () => {
    navigate(`/trainess/${row.id}/details`, {
      state: { trainee_id: row.id },
    });
  };

  return (
    <>
      <MenuItem sx={{ gap: 1 }} onClick={closeMenu} onClickCapture={GoToView}>
        View
      </MenuItem>
    </>
  );
};

ActionTrainess.propTypes = {
  row: propTypes.object,
  closeMenu: propTypes.func,
};

export default ActionTrainess;
