import {
    clearError,
    createLevelInClasses,
    deleteLevelInClasses,
    fetchLevelsClasses
} from "@src/store/reducers/Batches/Classes/Levels/LevelsSlice";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../Select";

const LevelClasses = ({
  label,
  Button,
  setStateId,
  defaultValue,
  required,
  showRemoveButton = false, // ✅ NEW: configurable remove button
}) => {
  const dispatch = useDispatch();
  const { Classes_levels, error, loading } = useSelector(
    (state) => state.levelClasses
  );

  useEffect(() => {
    dispatch(fetchLevelsClasses());
  }, [dispatch]);

  const AddNewLeveltoClasses = (data) => {
    dispatch(createLevelInClasses({ level: data }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchLevelsClasses());
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
      dispatch(deleteLevelInClasses(levelId))
        .unwrap()
        .then((response) => {
          console.log("Delete successful:", response);
          ToastSuccess(response.message || "Level deleted successfully");
          dispatch(fetchLevelsClasses());
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

  useEffect(() => {
    if (error) {
      ToastError(error);
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  return (
    <Select
      id="level_id"
      name="level"
      label={label}
      options={Classes_levels?.map((level) => ({
        id: level.id,
        label: level.level_name,
      }))}
      placeholder="Level"
      Button={Button}
      showRemoveButton={showRemoveButton}
      onSubmitNew={AddNewLeveltoClasses}
      onDelete={deleteLevelHandler}
      onChange={(e) => setStateId(Number(e.target.dataset.value))}
      loading={loading}
      defaultValue={defaultValue}
      required={required}
    />
  );
};

LevelClasses.propTypes = {
  setStateId: PropTypes.func,
  defaultValue: PropTypes.any,
  label: PropTypes.string,
  Button: PropTypes.bool,
  required: PropTypes.bool,
  showRemoveButton: PropTypes.bool,
};

export default LevelClasses;
