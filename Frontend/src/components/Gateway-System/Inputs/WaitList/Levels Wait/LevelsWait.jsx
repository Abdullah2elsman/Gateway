import {
  createLevel,
  deleteLevel,
  fetchLevels,
} from "@src/store/reducers/WaitList/View/ViewSlice";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { SiLevelsdotfyi } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../Select";

const LevelsWait = ({ defaultValue, onChange, required }) => {
  const dispatch = useDispatch();

  const { levels, loading } = useSelector((state) => state.viewWaitList);

  useEffect(() => {
    dispatch(fetchLevels());
  }, [dispatch]);

  // create a new level
  const createNewLevels = (level) => {
    dispatch(createLevel({ level }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchLevels());
      })
      .catch((error) => {
        ToastError(error.message || "Failed to create level");
      });
  };

  // delete a level
  const deleteLevelHandler = (levelId) => {
    if (window.confirm("Are you sure you want to delete this level? This will remove the level assignment from all trainees.")) {
      dispatch(deleteLevel(levelId))
        .unwrap()
        .then(({ message }) => {
          ToastSuccess(message);
          dispatch(fetchLevels());
        })
        .catch((error) => {
          ToastError(error.message || "Failed to delete level");
        });
    }
  };

  return (
    <Select
      id="level"
      label="Level"
      options={
        levels?.map((level) => ({
          id: level.id,
          label: level.level_name,
        })) || []
      }
      placeholder="select level"
      Icon={<SiLevelsdotfyi size={23} />}
      Button={true}
      defaultValue={defaultValue}
      required={required ?? true}
      showRemoveButton={true}
      onSubmitNew={createNewLevels}
      onDelete={deleteLevelHandler}
      loading={loading}
      onChange={onChange}
    />
  );
};

LevelsWait.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default LevelsWait;
