import PropTypes from "prop-types";
import { MenuItem } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { ToastSuccess } from "@src/util/Toast";
import {
  deleteBranch,
  getBranches,
} from "@src/store/reducers/Branches/BrancheSlice";
import checkPermission from "@src/util/CheckPermission";
import { clearSelected } from "@src/store/Hook/clearSelection";

const ActionBranches = ({ row, closeMenu, handlerEdit, onRequestDelete }) => {
  const dispatch = useDispatch();

  // Delete one branch (can be handled by parent confirm dialog)
  const onDelete = () => {
    // If parent provided a custom delete handler (for a confirm popup), use it
    if (typeof onRequestDelete === "function") {
      onRequestDelete(row);
      return;
    }

    // Fallback: original direct delete behavior
    dispatch(deleteBranch(row.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(getBranches());
        dispatch(clearSelected());
      });
  };

  return (
    <>
      {checkPermission({
        name: "branches",
        children: ["update_branch"],
      }) && (
        <MenuItem
          sx={{ gap: 1 }}
          onClick={closeMenu}
          onClickCapture={() => handlerEdit(row)}
        >
          <FaRegEdit size={20} color="#2b6cb0" />
          Edit
        </MenuItem>
      )}

      {checkPermission({
        name: "branches",
        children: ["delete_branch"],
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

ActionBranches.propTypes = {
  row: PropTypes.object,
  closeMenu: PropTypes.func,
  handlerEdit: PropTypes.func,
  onRequestDelete: PropTypes.func, // optional confirm handler
};

export default ActionBranches;
