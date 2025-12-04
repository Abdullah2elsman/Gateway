import { MenuItem } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdMotionPhotosPaused } from "react-icons/md";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  DeleteBlackList,
  fetchBlackList,
} from "@src/store/reducers/BlackList/BlackListSlice";
import { ToastSuccess } from "@src/util/Toast";
import { MoveBlackToWaitList } from "@src/store/reducers/BlackList/Move/MoveBlackListSlice";
import checkPermission from "@src/util/CheckPermission";
import { clearSelected } from "@src/store/Hook/clearSelection";

const ActionBlacklist = ({ row, closeMenu, HandlerEdit, onRequestDelete }) => {
  const dispatch = useDispatch();

  // Move black to wait list
  const onMoveToWaitList = () => {
    dispatch(MoveBlackToWaitList(row.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchBlackList());
        dispatch(clearSelected());
      });
  };

  const onDelete = () => {
    
    if (typeof onRequestDelete === "function") {
      onRequestDelete(row);
      return;
    }

   
    dispatch(DeleteBlackList(row.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchBlackList());
        dispatch(clearSelected());
      });
  };

  return (
    <>
      {checkPermission({
        name: "blacklist",
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
        name: "blacklist",
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
        name: "blacklist",
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

ActionBlacklist.propTypes = {
  row: PropTypes.object,
  closeMenu: PropTypes.func,
  HandlerEdit: PropTypes.func,
  onRequestDelete: PropTypes.func, 
};

export default ActionBlacklist;
