import { MenuItem } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { ToastSuccess } from "@src/util/Toast";
import {
  deletePendingTest,
  fetchPendingTestList,
} from "@src/store/reducers/PendingTestList/PendingTestSlice";
import checkPermission from "@src/util/CheckPermission";
import { clearSelected } from "@src/store/Hook/clearSelection";

const ActionPendingTest = ({
  row,
  closeMenu,
  HandlerEdit,
  openAssignLevel,
  openAssignTrainer,
  onRequestDelete, // optional delete handler (for confirm popup)
}) => {
  const dispatch = useDispatch();

  // Delete one pending test (with optional external confirm handler)
  const onDelete = () => {
    // If parent passes a custom delete handler (for a confirm dialog), use it
    if (typeof onRequestDelete === "function") {
      onRequestDelete(row);
      return;
    }

    // Fallback: original direct delete behavior
    dispatch(deletePendingTest(row.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchPendingTestList());
        dispatch(clearSelected());
      });
  };

  return (
    <>
      {checkPermission({
        name: "pendinglist",
        children: [
          "update_trainees",
          "update_own_trainees",
          "update_trainees_by_branch",
        ],
      }) && (
        <MenuItem
          onClick={closeMenu}
          sx={{ gap: 1 }}
          onClickCapture={() => HandlerEdit(row)}
        >
          <FaRegEdit size={20} color="#2b6cb0" />
          Edit
        </MenuItem>
      )}

      {checkPermission({
        name: "pendinglist",
        children: ["assign_level", "assign_level_by_branch"],
      }) && (
        <MenuItem
          onClick={closeMenu}
          sx={{ gap: 1 }}
          onClickCapture={() => openAssignLevel(row.id)}
        >
          <MdOutlineAssignmentTurnedIn size={20} color="#777" />
          Assign Level
        </MenuItem>
      )}

      {checkPermission({
        name: "pendinglist",
        children: ["assign_trainer", "assign_trainer_by_branch"],
      }) && (
        <MenuItem
          onClick={closeMenu}
          sx={{ gap: 1 }}
          onClickCapture={() => openAssignTrainer(row)}
        >
          <MdOutlineAssignmentTurnedIn size={20} color="#777" />
          Assign Trainer
        </MenuItem>
      )}

      {checkPermission({
        name: "pendinglist",
        children: [
          "delete_trainees",
          "delete_own_trainees",
          "delete_trainees_by_branch",
        ],
      }) && (
        <MenuItem
          onClick={closeMenu}
          sx={{ gap: 1 }}
          onClickCapture={onDelete}
        >
          <AiOutlineDelete size={20} color="brown" />
          Delete
        </MenuItem>
      )}
    </>
  );
};

ActionPendingTest.propTypes = {
  row: PropTypes.object,
  closeMenu: PropTypes.func,
  HandlerEdit: PropTypes.func,
  openAssignLevel: PropTypes.func,
  openAssignTrainer: PropTypes.func,
  onRequestDelete: PropTypes.func, // optional, used when parent wants a confirm dialog
};

export default ActionPendingTest;
