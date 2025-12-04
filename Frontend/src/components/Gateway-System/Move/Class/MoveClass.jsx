import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { ToastSuccess } from "@src/util/Toast";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BulkClassSwitchClass,
  BulkClassToBlack,
  BulkClassToHold,
  BulkClassToRefund,
  BulkClassToWait,
  clearError,
} from "@src/store/reducers/Batches/Classes/Bulk/BulkClass";
import { fetchClass } from "@src/store/reducers/Batches/Classes/ClassesSlice";
import { useEffect, useState } from "react";
import Modals from "../../Modals/Modals";
import AddSwitchClass from "@src/components/forms/Classes/Swtich Class/AddSwitchClass";
import checkPermission from "@src/util/CheckPermission";
import { clearSelected } from "@src/store/Hook/clearSelection";

const MoveClass = ({ styles, selected }) => {
  const [switch_class, setSwitchClass] = useState(false);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const { error, loading } = useSelector((state) => state.bulkClass);

  const onBulkMoveToWait = () => {
    dispatch(BulkClassToWait({ class_id: state?.class_id, trainees: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(
          fetchClass({ batch_id: state?.batchId, class_id: state?.class_id })
        );
        dispatch(clearSelected());
        navigation(0)
      });
  };

  const onBulkMoveToHold = () => {
    dispatch(BulkClassToHold({ class_id: state?.class_id, trainees: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(
          fetchClass({ batch_id: state?.batchId, class_id: state?.class_id })
        );
        dispatch(clearSelected());
        navigation(0);
      });
  };

  const onBulkMoveToRefund = () => {
    dispatch(
      BulkClassToRefund({ class_id: state?.class_id, trainees: selected })
    )
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(
          fetchClass({ batch_id: state?.batchId, class_id: state?.class_id })
        );
        dispatch(clearSelected());
        navigation(0);
      });
  };

  const onBulkMoveToBlackList = () => {
    dispatch(
      BulkClassToBlack({ class_id: state?.class_id, trainees: selected })
    )
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(
          fetchClass({ batch_id: state?.batchId, class_id: state?.class_id })
        );
        dispatch(clearSelected());
        navigation(0);
      });
  };

  const onBulkMoveToSwitchClass = (class_Id) => {
    dispatch(
      BulkClassSwitchClass({
        trainees: selected,
        class_id: class_Id,
        old_class: state?.class_id,
      })
    )
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        setSwitchClass(false);
        dispatch(
          fetchClass({ batch_id: state?.batchId, class_id: state?.class_id })
        );
        dispatch(clearSelected());
        navigation(0);
      });
  };

  console.log(switch_class);

  // show error message
  useEffect(() => {
    if (error) {
      ToastSuccess(error.message);
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  return (
    <>
      {checkPermission({
        name: "classes",
        children: ["move_to_wait", "move_to_wait_by_branch"],
      }) && (
          <Button
            variant="contained"
            className={styles}
            onClick={onBulkMoveToWait}
          >
            Move to Wait All
          </Button>
        )}
      {checkPermission({
        name: "classes",
        children: ["move_to_hold", "move_to_hold_by_branch"],
      }) && (
          <Button
            variant="contained"
            className={styles}
            onClick={onBulkMoveToHold}
          >
            Move to Hold All
          </Button>
        )}
      {checkPermission({
        name: "classes",
        children: ["move_to_refund", "move_to_refund_by_branch"],
      }) && (
          <Button
            variant="contained"
            className={styles}
            onClick={onBulkMoveToRefund}
          >
            Move to Refund All
          </Button>
        )}
      {checkPermission({
        name: "classes",
        children: ["move_to_black", "move_to_blacklist_by_branch"],
      }) && (
          <Button
            variant="contained"
            className={styles}
            onClick={onBulkMoveToBlackList}
          >
            Move to BlackList All
          </Button>
        )}
      {checkPermission({
        name: "classes",
        children: ["switch_class", "switch_class_by_branch"],
      }) && (
          <div>
            <Button
              variant="contained"
              className={styles}
              onClick={() => setSwitchClass(true)}
            >
              Switch Class
            </Button>

            <Modals
              isOpen={switch_class}
              handleClose={() => setSwitchClass(false)}
            >
              <AddSwitchClass
                type="bulkClass"
                onBulk={onBulkMoveToSwitchClass}
                trainee_id={switch_class?.trainee_id}
                batch_id={state?.batchId}
                class_id={state?.class_id}
                loading={loading}
                handleClose={() => setSwitchClass(false)}
              />
            </Modals>
          </div>
        )}
    </>
  );
};

MoveClass.propTypes = {
  styles: PropTypes.string.isRequired,
  selected: PropTypes.array.isRequired,
};

export default MoveClass;
