import { Box, Button } from "@mui/material";
import Select from "@src/components/Gateway-System/Inputs/Select";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import { clearSelected } from "@src/store/Hook/clearSelection";
import {
    clearError,
    createPendingTestAssignLevel,
    fetchPendingTestAssignLevel,
    removePendingTestAssignLevel,
    updatePendingTestAssignLevel
} from "@src/store/reducers/PendingTestList/Assign/PendingTestAssign";
import {
    deletePendingTestLevel,
    fetchPendingTestList
} from "@src/store/reducers/PendingTestList/PendingTestSlice";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  // remove the AssignLevel for pending test
  const removeAssignLevel = () => {
    dispatch(removePendingTestAssignLevel(trainee_id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchPendingTestList());
        closeModal();
        dispatch(clearSelected());
      });
  };

  // delete a level from the system
  const deleteLevelHandler = (levelId) => {
    console.log("Delete level called with ID:", levelId, "Type:", typeof levelId);
    
    if (!levelId) {
      console.error("No level ID provided");
      ToastError("No level ID provided");
      return;
    }
    
    const confirmed = window.confirm("Are you sure you want to delete this level? This will remove it from the system permanently.");
    console.log("User confirmation:", confirmed);
    
    if (confirmed) {
      console.log("User confirmed deletion, dispatching action...");
      dispatch(deletePendingTestLevel(levelId))
        .unwrap()
        .then((response) => {
          console.log("Delete successful:", response);
          ToastSuccess(response.message || "Level deleted successfully");
          dispatch(fetchPendingTestAssignLevel());
        })
        .catch((error) => {
          console.error("Delete failed:", error);
          console.error("Error details:", error.response?.data || error);
          ToastError(error.message || error || "Failed to delete level");
        });
    } else {
      console.log("User canceled deletion");
    }
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
        showRemoveButton={true}
        onDelete={deleteLevelHandler}
        loading={isLoading}
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
