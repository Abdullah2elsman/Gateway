import { MenuItem } from "@mui/material";
import { clearSelected } from "@src/store/Hook/clearSelection";
import { MoveRefundToWaitList } from "@src/store/reducers/Refund/Move/MoveRefundSlice";
import {
    DeleteRefundList,
    fetchRefundList,
} from "@src/store/reducers/Refund/RefundSlice";
import checkPermission from "@src/util/CheckPermission";
import { ToastSuccess } from "@src/util/Toast";
import PropTypes from "prop-types";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdMotionPhotosPaused } from "react-icons/md";
import { useDispatch } from "react-redux";

const ActionRefund = ({ row, closeMenu, HandlerEdit, onRequestDelete }) => {
  const dispatch = useDispatch();

  // Move hold to wait list
  const onMoveToWaitList = () => {
    dispatch(MoveRefundToWaitList(row.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(clearSelected());
      });
  };

  const onDelete = () => {
    // ✅ لو الصفحة مررت onRequestDelete هنستخدم البوب أب هناك
    if (typeof onRequestDelete === "function") {
      onRequestDelete(row);
      return;
    }

    // ✅ لو مفيش onRequestDelete نشتغل بالسلوك القديم 100%
    dispatch(DeleteRefundList(row.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchRefundList());
        dispatch(clearSelected());
      });
  };

  return (
    <>
      {checkPermission({
        name: "refundlist",
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
        name: "refundlist",
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
        name: "refundlist",
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

ActionRefund.propTypes = {
  row: PropTypes.object,
  closeMenu: PropTypes.func,
  HandlerEdit: PropTypes.func,
  onRequestDelete: PropTypes.func, // ✅ جديد اختياري
};

export default ActionRefund;
