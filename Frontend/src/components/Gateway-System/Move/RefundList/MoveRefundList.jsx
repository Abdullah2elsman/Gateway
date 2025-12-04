import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { ToastSuccess } from "@src/util/Toast";
import {
  bulkDeleteRefundList,
  fetchRefundList,
} from "@src/store/reducers/Refund/RefundSlice";
import { bulkMoveRefundToWaitList } from "@src/store/reducers/Refund/Move/MoveRefundSlice";
import checkPermission from "@src/util/CheckPermission";
import { clearSelected } from "@src/store/Hook/clearSelection";
import { useNavigate } from 'react-router-dom';

const MoveRefundList = ({ styles, selected }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const onBulkMoveRefundToWaitList = () => {
    dispatch(bulkMoveRefundToWaitList({ trainees: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchRefundList());
        dispatch(clearSelected());
        navigation(0);
      });
  };

  const bulkDelete = () => {
    dispatch(bulkDeleteRefundList({ trainees: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchRefundList());
        dispatch(clearSelected());
        navigation(0);
      });
  };

  return (
    <>
      {checkPermission({
        name: "refundlist",
        children: ["move_to_wait", "move_to_wait_by_branch"],
      }) && (
          <Button
            variant="contained"
            className={styles}
            onClick={onBulkMoveRefundToWaitList}
          >
            Move to WaitList All
          </Button>
        )}
      {checkPermission({
        name: "refundlist",
        children: [
          "delete_trainees",
          "delete_own_trainees",
          "delete_trainees_by_branch",
        ],
      }) && (
          <Button variant="contained" className={styles} onClick={bulkDelete}>
            Delete All
          </Button>
        )}
    </>
  );
};

MoveRefundList.propTypes = {
  styles: PropTypes.string,
  selected: PropTypes.array,
};

export default MoveRefundList;
