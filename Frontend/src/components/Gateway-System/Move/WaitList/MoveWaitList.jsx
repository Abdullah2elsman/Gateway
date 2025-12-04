import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import {
  bulkMoveBlackList,
  bulkMoveHoldList,
  bulkMoveRefundList,
} from "@src/store/reducers/WaitList/Move/MoveWaitListSlice";
import {
  bulkDeleteWaitList,
  fetchWaitList,
} from "@src/store/reducers/WaitList/WaitListSlice";
import { ToastSuccess } from "@src/util/Toast";
import { useDispatch } from "react-redux";
import { bulkAssignClass } from "@src/store/reducers/WaitList/AssignClass/AssignClassSlice";
import Modals from "../../Modals/Modals";
import AssignClass from "@src/components/forms/WaitList/Assign Class/AssignClass";
import checkPermission from "@src/util/CheckPermission";
import { clearSelected } from "@src/store/Hook/clearSelection";
import { useNavigate } from "react-router-dom";

const MoveWaitList = ({ styles, selected }) => {
  const [isOpenAssignClass, setIsOpenAssignClass] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  // bulk Move HoldList
  const onBulkMoveToHoldList = () => {
    dispatch(bulkMoveHoldList({ trainees: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchWaitList());
        dispatch(clearSelected());
        navigation(0);
      });
  };

  // bulk Move Refund List
  const onBulkMoveRefundList = () => {
    dispatch(bulkMoveRefundList({ trainees: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchWaitList());
        dispatch(clearSelected());
        navigation(0);
      });
  };

  // bulk Move Black List
  const onBulkMoveBlackList = () => {
    dispatch(bulkMoveBlackList({ trainees: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchWaitList());
        dispatch(clearSelected());
        navigation(0);
      });
  };

  // bulk Assign Class
  const onBulkAssignClass = (class_id) => {
    dispatch(bulkAssignClass({ trainees: selected, class_id }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchWaitList());
        dispatch(clearSelected());
        navigation(0);
      });
  };

  // bulk delete trainees
  const bulkDelete = () => {
    dispatch(bulkDeleteWaitList({ trainees: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchWaitList());
        dispatch(clearSelected());
        navigation(0);
      });
  };

  return (
    <>
      {checkPermission({
        name: "waitlist",
        children: ["assign_class", "assign_class_by_branch"],
      }) && (
        <div>
          <Button
            variant="contained"
            className={styles}
            onClick={() => setIsOpenAssignClass(true)}
          >
            Assign Class
          </Button>

          <Modals
            isOpen={isOpenAssignClass}
            handleClose={() => setIsOpenAssignClass(false)}
          >
            <AssignClass
              closeAssignClass={() => setIsOpenAssignClass(false)}
              type="bulkAssignClass"
              handlerBulkDispatch={onBulkAssignClass}
              selectAllIds={selected}
            />
          </Modals>
        </div>
      )}
      {checkPermission({
        name: "waitlist",
        children: ["move_to_hold", "move_to_hold_by_branch"],
      }) && (
        <Button
          variant="contained"
          className={styles}
          onClick={onBulkMoveToHoldList}
        >
          Move to hold
        </Button>
      )}
      {checkPermission({
        name: "waitlist",
        children: ["move_to_refund", "move_to_refund_by_branch"],
      }) && (
        <Button
          variant="contained"
          className={styles}
          onClick={onBulkMoveRefundList}
        >
          Move to refund
        </Button>
      )}
      {checkPermission({
        name: "waitlist",
        children: ["move_to_blacklist", "move_to_blacklist_by_branch"],
      }) && (
        <Button
          variant="contained"
          className={styles}
          onClick={onBulkMoveBlackList}
        >
          Move to blackList
        </Button>
      )}
      {checkPermission({
        name: "waitlist",
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

MoveWaitList.propTypes = {
  styles: PropTypes.any,
  selected: PropTypes.any,
};

export default MoveWaitList;
