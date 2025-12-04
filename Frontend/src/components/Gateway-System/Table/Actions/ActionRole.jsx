import PropTypes from "prop-types";
import { Divider, MenuItem } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteRole, fetchRoles } from "@src/store/reducers/Role/RoleSlice";
import { ToastSuccess } from "@src/util/Toast";
import checkPermission from "@src/util/CheckPermission";
import { clearSelected } from "@src/store/Hook/clearSelection";

const ActionRole = ({ row, closeMenu, HandlerEdit }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteRole(row.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchRoles());
        dispatch(clearSelected());
      });
  };

  return (
    <>
      {checkPermission({
        name: "roles",
        children: ["update_role"],
      }) && (
        <MenuItem
          onClick={closeMenu}
          sx={{ gap: 1 }}
          onClickCapture={() => HandlerEdit(row.id)}
        >
          <FaRegEdit size={20} color="#2b6cb0" />
          Edit
        </MenuItem>
      )}

      <Divider sx={{ my: 0.5 }} />
      {checkPermission({
        name: "roles",
        children: ["delete_role"],
      }) && (
        <MenuItem sx={{ gap: 1 }} onClick={closeMenu} onClickCapture={onDelete}>
          <AiOutlineDelete size={20} color="brown" />
          Delete
        </MenuItem>
      )}
    </>
  );
};

ActionRole.propTypes = {
  row: PropTypes.object,
  closeMenu: PropTypes.func,
  HandlerEdit: PropTypes.func,
};

export default ActionRole;
