import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import Modals from "../../Modals/Modals";
import { useState } from "react";
import FormAssignLevel from "@src/components/forms/PendingTest/Assign/FormAssignLevel";
import FormAssignTrainer from "@src/components/forms/PendingTest/Assign/FormAssignTrainer";
import {
  bulkAssignLevel,
  bulkAssignTrainer,
  bulkResetAssignTrainer,
} from "@src/store/reducers/PendingTestList/Assign/PendingTestAssign";
import { ToastSuccess } from "@src/util/Toast";
import {
  bulkDeletePendingTests,
  fetchPendingTestList,
} from "@src/store/reducers/PendingTestList/PendingTestSlice";
import checkPermission from "@src/util/CheckPermission";
import { clearSelected } from "@src/store/Hook/clearSelection";
import { useNavigate } from "react-router-dom";


const MovePendingTest = ({ styles, selected }) => {
  const [assgin_level, setIsOpenAssignLevel] = useState(false);
  const [assgin_trainer, setIsOpenAssignTrainer] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const onBulkAssignLevel = (level_id) => {
    dispatch(bulkAssignLevel({ level: level_id, trainees: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchPendingTestList());
        setIsOpenAssignLevel(false);
        dispatch(clearSelected());
        navigation(0);
      });
  };

  const onBulkAssignTrainer = (trainer_id) => {
    dispatch(bulkAssignTrainer({ trainer: trainer_id, trainees: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchPendingTestList());
        setIsOpenAssignTrainer(false);
        dispatch(clearSelected());
        navigation(0);
      });
  };

  const onBulkResetAssignTrainer = () => {
    dispatch(bulkResetAssignTrainer({ trainer: null, trainees: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchPendingTestList());
        setIsOpenAssignTrainer(false);
        dispatch(clearSelected());
        navigation(0);
      });
  };

  const bulkDelete = () => {
    dispatch(bulkDeletePendingTests({ trainees: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchPendingTestList());
        dispatch(clearSelected());
        navigation(0);
      });
  };

  return (
    <>
      {checkPermission({
        name: "pendinglist",
        children: ["assign_level", "assign_level_by_branch"],
      }) && (
          <div>
            <Button
              variant="contained"
              className={styles}
              onClick={() => setIsOpenAssignLevel(true)}
            >
              Assign Level
            </Button>
            <Modals
              isOpen={assgin_level}
              handleClose={() => setIsOpenAssignLevel(false)}
            >
              <FormAssignLevel
                onBulk={onBulkAssignLevel}
                type="bulkAssignLevel"
                closeModal={() => setIsOpenAssignLevel(false)}
              />
            </Modals>
          </div>
        )}
      {checkPermission({
        name: "pendinglist",
        children: ["assgin_trainer", "assign_trainer_by_branch"],
      }) && (
          <div>
            <Button
              variant="contained"
              className={styles}
              onClick={() => setIsOpenAssignTrainer(true)}
            >
              Assign Trainer
            </Button>
            <Modals
              isOpen={assgin_trainer}
              handleClose={() => setIsOpenAssignTrainer(false)}
            >
              <FormAssignTrainer
                onBulk={onBulkAssignTrainer}
                onBulkReset={onBulkResetAssignTrainer}
                type="bulkAssignTrainer"
                closeModal={() => setIsOpenAssignTrainer(false)}
              />
            </Modals>
          </div>
        )}
      {checkPermission({
        name: "pendinglist",
        children: ["delete_trainees", "delete_trainees_by_branch"],
      }) && (
          <Button variant="contained" className={styles} onClick={bulkDelete}>
            Delete All
          </Button>
        )}
    </>
  );
};

MovePendingTest.propTypes = {
  styles: PropTypes.string,
  selected: PropTypes.array,
};

export default MovePendingTest;
