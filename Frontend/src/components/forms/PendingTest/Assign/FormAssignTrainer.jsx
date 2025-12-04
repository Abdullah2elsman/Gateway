import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import Select from "@src/components/Gateway-System/Inputs/Select";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import {
  clearError,
  fetchPendingTestAssignTrainer,
  ResetupdatePendingTestAssignTrainer,
  updatePendingTestAssignTrainer,
} from "@src/store/reducers/PendingTestList/Assign/PendingTestAssign";

import { ToastError, ToastSuccess } from "@src/util/Toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingTestList } from "@src/store/reducers/PendingTestList/PendingTestSlice";
import { clearSelected } from "@src/store/Hook/clearSelection";

const FormAssignTrainer = ({
  closeModal,
  trainee,
  type,
  onBulk,
  onBulkReset,
}) => {
  const [trainer_id, setTrainerID] = useState("");

  const dispatch = useDispatch();
  const { pendingTestAssignTrainer, isLoading, error, Loading_reset } =
    useSelector((state) => state.pendingTestAssign);

  useEffect(() => {
    dispatch(fetchPendingTestAssignTrainer());
  }, [dispatch]);

  // update the AssignTrainer for pending test
  const updateAssignTrainer = () => {
    dispatch(
      updatePendingTestAssignTrainer({ id: trainee.id, trainer: trainer_id })
    )
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchPendingTestList());
        closeModal();
        dispatch(clearSelected());
      });
  };

  const handlerSubmitted = (event) => {
    event.preventDefault();

    type === "bulkAssignTrainer" ? onBulk(trainer_id) : updateAssignTrainer();
  };

  // Reset Trainer
  const handlerReset = () => {
    dispatch(
      ResetupdatePendingTestAssignTrainer({ id: trainee.id, trainer: null })
    )
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchPendingTestList());
        closeModal();
        dispatch(clearSelected());
      });
  };

  // Show error message
  useEffect(() => {
    if (error) {
      ToastError(error.message);
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  return (
    <Box
      component={"form"}
      onSubmit={handlerSubmitted}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "40px 0 20px",
      }}
    >
      <Select
        id="trainer"
        label="Trainer"
        options={
          pendingTestAssignTrainer?.users?.map((trainer) => ({
            id: trainer.id,
            label: trainer.full_name,
          })) || []
        }
        placeholder="Assign Trainer"
        required={true}
        defaultValue={trainee?.trainer}
        onChange={(e) => setTrainerID(Number(e.target.dataset.value))}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Button type="submit" variant="contained">
          {isLoading && <Spinner />} Add Assign
        </Button>
        <Button
          type="button"
          variant="contained"
          style={{ background: "#eee", color: "#000" }}
          onClick={type === "bulkAssignTrainer" ? onBulkReset : handlerReset}
        >
          {Loading_reset && <Spinner color="#000" />} Reset
        </Button>
      </div>
    </Box>
  );
};

FormAssignTrainer.propTypes = {
  closeModal: PropTypes.func,
  trainee: PropTypes.any,
  type: PropTypes.string,
  onBulk: PropTypes.func,
  onBulkReset: PropTypes.func,
};

export default FormAssignTrainer;
