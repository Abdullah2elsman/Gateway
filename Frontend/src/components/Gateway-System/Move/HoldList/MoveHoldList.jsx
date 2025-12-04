import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { ToastSuccess } from "@src/util/Toast";
import {
  bulkDeleteHoldList,
  fetchHoldlist,
} from "@src/store/reducers/HoldList/HoldListSlice";
import { bulkMoveHoldToWaitList } from "@src/store/reducers/HoldList/Move/MoveHoldListSlice";
import checkPermission from "@src/util/CheckPermission";
import { clearSelected } from "@src/store/Hook/clearSelection";
import { useNavigate } from "react-router-dom";

const MoveHoldList = ({ styles, selected }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const onBulkMoveHoldToWaitList = () => {
    dispatch(bulkMoveHoldToWaitList({ trainees: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchHoldlist());
        dispatch(clearSelected());
        navigation(0);
      })
  };

  const bulkDelete = () => {
    dispatch(bulkDeleteHoldList({ trainees: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchHoldlist());
        dispatch(clearSelected());
        navigation(0);
      });
  };

  return (
    <>
      {checkPermission({
        name: "holdlist",
        children: ["move_to_wait", "move_to_wait_by_branch"],
      }) && (
          <Button
            variant="contained"
            className={styles}
            onClick={onBulkMoveHoldToWaitList}
          >
            Move to WaitList All
          </Button>
        )}
      {checkPermission({
        name: "holdlist",
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

MoveHoldList.propTypes = {
  styles: PropTypes.string,
  selected: PropTypes.array,
};

export default MoveHoldList;
