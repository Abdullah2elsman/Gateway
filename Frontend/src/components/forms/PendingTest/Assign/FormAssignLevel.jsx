import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import Select from "@src/components/Gateway-System/Inputs/Select";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import {
  clearError,
  createPendingTestAssignLevel,
  fetchPendingTestAssignLevel,
  updatePendingTestAssignLevel,
} from "@src/store/reducers/PendingTestList/Assign/PendingTestAssign";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingTestList } from "@src/store/reducers/PendingTestList/PendingTestSlice";
import { clearSelected } from "@src/store/Hook/clearSelection";

const FormAssignLevel = ({ closeModal, trainee_id, onBulk, type }) => {
  const [level_id, setLevelId] = useState("");

  const dispatch = useDispatch();
  const { pendingTestAssignLevel, isLoading, error } = useSelector(
    (state) => state.pendingTestAssign
  );

  useEffect(() => {
    dispatch(fetchPendingTestAssignLevel());
  }, [dispatch]);

  const createNewAssignLevel = (level) => {
    dispatch(createPendingTestAssignLevel({ level }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchPendingTestAssignLevel());
      });
  };

  // update the AssignLevel for pending test
  const updateAssignLevel = () => {
    dispatch(updatePendingTestAssignLevel({ id: trainee_id, level: level_id }))
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

    type === "bulkAssignLevel" ? onBulk(level_id) : updateAssignLevel();
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
        id="level"
        label="Level"
        options={
          pendingTestAssignLevel?.map((level) => ({
            id: level.id,
            label: level.level_name,
          })) || []
        }
        placeholder="Assign Level"
        required={true}
        Button={true}
        onSubmitNew={createNewAssignLevel}
        onChange={(e) => setLevelId(Number(e.target.dataset.value))}
      />

      <Button type="submit" variant="contained">
        {isLoading && <Spinner />} Add Assign
      </Button>
    </Box>
  );
};

FormAssignLevel.propTypes = {
  closeModal: PropTypes.func,
  trainee_id: PropTypes.number,
  onBulk: PropTypes.func,
  type: PropTypes.string,
};

export default FormAssignLevel;
