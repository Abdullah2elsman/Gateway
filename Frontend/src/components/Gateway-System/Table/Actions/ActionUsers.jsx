import PropTypes from "prop-types";
import { MenuItem } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { deleteUser, fetchUsers } from "@src/store/reducers/Users/UsersSlice";
import { useDispatch } from "react-redux";
import { ToastSuccess } from "@src/util/Toast";
import checkPermission from "@src/util/CheckPermission";
import { clearSelected } from "@src/store/Hook/clearSelection";

const ActionUsers = ({ row, closeMenu, HandlerEdit, onRequestDelete }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    // ✅ لو الأب مرّر onRequestDelete نستخدمه (علشان البوب أب)
    if (typeof onRequestDelete === "function") {
      onRequestDelete(row);
      return;
    }

    // ✅ غير كده نشتغل بالسلوك القديم 100%
    dispatch(deleteUser(row.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchUsers());
        dispatch(clearSelected());
      });
  };

  return (
    <>
      {checkPermission({
        name: "users",
        children: [
          "update_users",
          "update_own_users",
          "update_users_by_branch",
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
        name: "users",
        children: [
          "delete_users",
          "delete_own_users",
          "delete_users_by_branch",
          "delete_self",
        ],
      }) && (
        <MenuItem
          sx={{ gap: 1 }}
          onClick={closeMenu}
          onClickCapture={onDelete}
        >
          <AiOutlineDelete size={20} color="brown" />
          Delete
        </MenuItem>
      )}
    </>
  );
};

ActionUsers.propTypes = {
  row: PropTypes.object,
  closeMenu: PropTypes.func,
  HandlerEdit: PropTypes.func,
  onRequestDelete: PropTypes.func, // ✅ جديد (اختياري)
};

export default ActionUsers;
