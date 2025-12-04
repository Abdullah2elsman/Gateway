import PropTypes from "prop-types";
import { MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  updateMoveClassToBlackList,
  updateMoveClassToHold,
  updateMoveClassToRefund,
  updateMoveClassToWait,
} from "@src/store/reducers/Batches/Classes/Move/MoveClassSlice";
import { ToastSuccess } from "@src/util/Toast";
import { fetchClass } from "@src/store/reducers/Batches/Classes/ClassesSlice";
import checkPermission from "@src/util/CheckPermission";
import { clearSelected } from "@src/store/Hook/clearSelection";

const ActionClass = ({
  row,
  closeMenu,
  batch_id,
  class_id,
  openSwitchClass,
  openAdminNotes,
}) => {
  const dispatch = useDispatch();

  const MoveClassToWait = () => {
    dispatch(updateMoveClassToWait({ class_id, trainee_id: row.id }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchClass({ batch_id, class_id }));
        dispatch(clearSelected());
      });
  };

  const MoveClassToHold = () => {
    dispatch(updateMoveClassToHold({ class_id, trainee_id: row.id }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchClass({ batch_id, class_id }));
        dispatch(clearSelected());
      });
  };

  const MoveClassToRefund = () => {
    dispatch(updateMoveClassToRefund({ class_id, trainee_id: row.id }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchClass({ batch_id, class_id }));
        dispatch(clearSelected());
      });
  };

  const MoveClassToBlackList = () => {
    dispatch(updateMoveClassToBlackList({ class_id, trainee_id: row.id }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchClass({ batch_id, class_id }));
        dispatch(clearSelected());
      });
  };

  return (
    <>
      {checkPermission({
        name: "classes",
        children: ["move_to_wait", "move_to_wait_by_branch"],
      }) && (
        <MenuItem
          sx={{ gap: 1 }}
          onClick={closeMenu}
          onClickCapture={MoveClassToWait}
        >
          Move to wait
        </MenuItem>
      )}

      {checkPermission({
        name: "classes",
        children: ["move_to_hold", "move_to_hold_by_branch"],
      }) && (
        <MenuItem
          sx={{ gap: 1 }}
          onClick={closeMenu}
          onClickCapture={MoveClassToHold}
        >
          Move to hold
        </MenuItem>
      )}

      {checkPermission({
        name: "classes",
        children: ["move_to_refund", "move_to_refund_by_branch"],
      }) && (
        <MenuItem
          sx={{ gap: 1 }}
          onClick={closeMenu}
          onClickCapture={MoveClassToRefund}
        >
          Move to refund
        </MenuItem>
      )}

      {checkPermission({
        name: "classes",
        children: ["move_to_blacklist", "move_to_blacklist_by_branch"],
      }) && (
        <MenuItem
          sx={{ gap: 1 }}
          onClick={closeMenu}
          onClickCapture={MoveClassToBlackList}
        >
          Move to blackList
        </MenuItem>
      )}

      {/* Modal */}
      {checkPermission({
        name: "classes",
        children: ["switch_class", "switch_class_by_branch"],
      }) && (
        <MenuItem
          sx={{ gap: 1 }}
          onClick={closeMenu}
          onClickCapture={() => openSwitchClass(row.id)}
        >
          Switch Class
        </MenuItem>
      )}

      {checkPermission({
        name: "classes",
        children: ["add_admin_note", "add_admin_note_by_branch"],
      }) && (
        <MenuItem
          sx={{ gap: 1 }}
          onClick={closeMenu}
          onClickCapture={() =>
            openAdminNotes({ trainee_id: row.id, admin_note: row.admin_note })
          }
        >
          Add Admin Notes
        </MenuItem>
      )}
    </>
  );
};

ActionClass.propTypes = {
  row: PropTypes.object,
  batch_id: PropTypes.number,
  class_id: PropTypes.number,
  closeMenu: PropTypes.func,
  openSwitchClass: PropTypes.func,
  openAdminNotes: PropTypes.func,
};

export default ActionClass;
