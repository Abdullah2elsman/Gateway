import { Button, MenuItem } from "@mui/material";
import {
  activatePendingUser,
  deletePendingUser,
  fetchPendingUsers,
} from "@src/store/reducers/PendingUser/PendingUserSlice";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { ToastSuccess } from "@src/util/Toast";
import checkPermission from "@src/util/CheckPermission";
import { clearSelected } from "@src/store/Hook/clearSelection";

const ActionPendingUser = ({ row, CloseMenu }) => {
  const dispatch = useDispatch();

  const onAccpet = () => {
    dispatch(activatePendingUser(row.id))
      .unwrap()
      .then(({ message }) => {
        dispatch(fetchPendingUsers());
        ToastSuccess(message);
        dispatch(clearSelected());
      });
  };

  const onDelete = () => {
    dispatch(deletePendingUser(row.id))
      .unwrap()
      .then(({ message }) => {
        dispatch(fetchPendingUsers());
        ToastSuccess(message);
        dispatch(clearSelected());
      });
  };

  return (
    <>
      {checkPermission({
        name: "pendingusers",
        children: ["assign_activate", "activate_users_by_branch"],
      }) && (
        <MenuItem
          sx={{ paddingBottom: "10px" }}
          onClick={CloseMenu}
          onClickCapture={onAccpet}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#2b6cb0",
              padding: "5px !important",
              textTransform: "none",
              lineHeight: "1.5 !important",
            }}
          >
            Accept
          </Button>
        </MenuItem>
      )}

      {checkPermission({
        name: "pendingusers",
        children: ["delete_pending_users", "delete_pending_users_by_branch"],
      }) && (
        <MenuItem onClick={CloseMenu} onClickCapture={onDelete}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "brown",
              padding: "5px !important",
              textTransform: "none",
              lineHeight: "1.5 !important",
            }}
          >
            Delete
          </Button>
        </MenuItem>
      )}
    </>
  );
};

ActionPendingUser.propTypes = {
  row: PropTypes.object,
  CloseMenu: PropTypes.func,
};

export default ActionPendingUser;
