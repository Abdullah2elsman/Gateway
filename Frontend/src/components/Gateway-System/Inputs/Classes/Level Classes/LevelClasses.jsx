import { useEffect } from "react";
import PropTypes from "prop-types";
import Select from "../../Select";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  createLevelInClasses,
  fetchLevelsClasses,
} from "@src/store/reducers/Batches/Classes/Levels/LevelsSlice";
import { ToastError, ToastSuccess } from "@src/util/Toast";

const LevelClasses = ({
  label,
  Button,
  setStateId,
  defaultValue,
  required,
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
      onSubmitNew={AddNewLeveltoClasses}
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
};

export default LevelClasses;
