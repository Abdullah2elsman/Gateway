import PropTypes from "prop-types";
import { Button } from "@mui/material";
import {
  bulkActivateUsers,
  bulkDeletePendingUsers,
  fetchPendingUsers,
} from "@src/store/reducers/PendingUser/PendingUserSlice";
import { ToastSuccess } from "@src/util/Toast";
import { useDispatch } from "react-redux";
import checkPermission from "@src/util/CheckPermission";
import { clearSelected } from "@src/store/Hook/clearSelection";
import { useNavigate } from "react-router-dom";

const MovePendingUser = ({ styles, selected }) => {
  const dispatch = useDispatch();

  const navigation = useNavigate();

  // Activate PendingUsers
  const bulkActivatePendingUsers = () => {
    dispatch(bulkActivateUsers({ users: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchPendingUsers());
        dispatch(clearSelected());
        navigation(0);
      });
  };

  const BulkDelete = () => {
    dispatch(bulkDeletePendingUsers({ users: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchPendingUsers());
        dispatch(clearSelected());
        navigation(0);
      });
  };

  return (
    <>
      {checkPermission({
        name: "pendingusers",
        children: ["assign_activate", "activate_users_by_branch"],
      }) && (
          <Button
            variant="contained"
            className={styles}
            onClick={bulkActivatePendingUsers}
          >
            Activate All
          </Button>
        )}
      {checkPermission({
        name: "pendingusers",
        children: ["delete_pending_users", "delete_pending_users_by_branch"],
      }) && (
          <Button variant="contained" className={styles} onClick={BulkDelete}>
            Delete All
          </Button>
        )}
    </>
  );
};

MovePendingUser.propTypes = {
  styles: PropTypes.string,
  selected: PropTypes.array,
};

export default MovePendingUser;
