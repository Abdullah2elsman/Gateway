import PropTypes from "prop-types";
import { MenuItem } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { GoBlocked } from "react-icons/go";
import { MdMotionPhotosPaused, MdOutlineDateRange } from "react-icons/md";
import { TbCreditCardRefund } from "react-icons/tb";
import { useDispatch } from "react-redux";
import {
  fetchWaitList,
} from "@src/store/reducers/WaitList/WaitListSlice";
import { ToastSuccess } from "@src/util/Toast";
import {
  MoveToBlackList,
  MoveToHoldList,
  MoveToRefundList,
} from "@src/store/reducers/WaitList/Move/MoveWaitListSlice";
import checkPermission from "@src/util/CheckPermission";
import { clearSelected } from "@src/store/Hook/clearSelection";

const ActionWaitlist = ({
  row,
  closeMenu,
  HandlerEdit,
  openAssginClass,
  onRequestDelete, // ✅ جديد
}) => {
  const dispatch = useDispatch();

  const onMoveHoldList = () => {
    dispatch(MoveToHoldList(row.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchWaitList());
        dispatch(clearSelected());
      });
  };

  const onMoveRefundList = () => {
    dispatch(MoveToRefundList(row.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchWaitList());
        dispatch(clearSelected());
      });
  };

  const onMoveBlackList = () => {
    dispatch(MoveToBlackList(row.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchWaitList());
        dispatch(clearSelected());
      });
  };

  const onDelete = () => {
    if (typeof onRequestDelete === "function") {
      onRequestDelete(row); // ✅ نبلغ الأب إن الرو ده مطلوب يتشال
    }
  };

  return (
    <>
      {checkPermission({
        name: "waitlist",
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
        name: "waitlist",
        children: ["assign_class", "assign_class_by_branch"],
      }) && (
        <MenuItem
          onClick={closeMenu}
          sx={{ gap: 1 }}
          onClickCapture={() => openAssginClass(row.id)}
        >
          <MdOutlineDateRange size={20} color="#626189" />
          Assign Class
        </MenuItem>
      )}

      {checkPermission({
        name: "waitlist",
        children: ["move_to_hold", "move_to_hold_by_branch"],
      }) && (
        <MenuItem
          onClick={closeMenu}
          sx={{ gap: 1 }}
          onClickCapture={onMoveHoldList}
        >
          <MdMotionPhotosPaused size={20} color="#626189" />
          Hold
        </MenuItem>
      )}

      {checkPermission({
        name: "waitlist",
        children: ["move_to_refund", "move_to_refund_by_branch"],
      }) && (
        <MenuItem
          onClick={closeMenu}
          sx={{ gap: 1 }}
          onClickCapture={onMoveRefundList}
        >
          <TbCreditCardRefund size={20} color="#626189" />
          Refund
        </MenuItem>
      )}

      {checkPermission({
        name: "waitlist",
        children: ["move_to_blacklist", "move_to_blacklist_by_branch"],
      }) && (
        <MenuItem
          onClick={closeMenu}
          sx={{ gap: 1 }}
          onClickCapture={onMoveBlackList}
        >
          <GoBlocked size={20} color="#626189" />
          BlackList
        </MenuItem>
      )}

      {checkPermission({
        name: "waitlist",
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

ActionWaitlist.propTypes = {
  row: PropTypes.object,
  closeMenu: PropTypes.func,
  HandlerEdit: PropTypes.func,
  openAssginClass: PropTypes.func,
  onRequestDelete: PropTypes.func,
};

export default ActionWaitlist;
