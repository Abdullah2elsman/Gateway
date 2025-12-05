import { MenuItem } from "@mui/material";
import { clearSelected } from "@src/store/Hook/clearSelection";
import {
    DeleteHoldList,
    fetchHoldlist,
} from "@src/store/reducers/HoldList/HoldListSlice";
import { MoveToWaitList } from "@src/store/reducers/HoldList/Move/MoveHoldListSlice";
import checkPermission from "@src/util/CheckPermission";
import { ToastSuccess } from "@src/util/Toast";
import PropTypes from "prop-types";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdMotionPhotosPaused } from "react-icons/md";
import { useDispatch } from "react-redux";

const ActionHoldList = ({ row, closeMenu, HandlerEdit, onRequestDelete }) => {
  const dispatch = useDispatch();

  // Move hold to wait list (original behavior)
  const onMoveToWaitList = () => {
    dispatch(MoveToWaitList(row.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(clearSelected());
      });
  };

  // Delete one hold (with optional confirm popup handled by parent)
  const onDelete = () => {
    // If parent provided a custom delete handler (for popup), use it
    if (typeof onRequestDelete === "function") {
      onRequestDelete(row);
      return;
    }

    // Fallback: old direct delete behavior
    dispatch(DeleteHoldList(row.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchHoldlist());
        dispatch(clearSelected());
      });
  };

  return (
    <>
      {checkPermission({
        name: "holdlist",
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
        name: "holdlist",
        children: ["move_to_wait", "move_to_wait_by_branch"],
      }) && (
        <MenuItem
          onClick={closeMenu}
          sx={{ gap: 1 }}
          onClickCapture={onMoveToWaitList}
        >
          <MdMotionPhotosPaused size={20} color="#626189" />
          Move to wait
        </MenuItem>
      )}

      {checkPermission({
        name: "holdlist",
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

ActionHoldList.propTypes = {
  row: PropTypes.object,
  closeMenu: PropTypes.func,
  HandlerEdit: PropTypes.func,
  onRequestDelete: PropTypes.func, // optional: parent may pass popup handler
};

export default ActionHoldList;
