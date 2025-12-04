import { useEffect } from "react";
import PropTypes from "prop-types";
import Select from "../../Select";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainerForClasses } from "@src/store/reducers/Batches/Classes/ClassesSlice";

const TrainerClasses = ({ label, setStateId, defaultValue, required }) => {
  const dispatch = useDispatch();

  const { trainer_classes } = useSelector((state) => state.classes);

  useEffect(() => {
    dispatch(fetchTrainerForClasses());
  }, [dispatch]);

  return (
    <Select
      id="trainer_id"
      label={label}
      options={
        trainer_classes?.users?.map((trainer) => ({
          id: trainer.id,
          label: trainer.full_name,
        })) || []
      }
      placeholder="Trainer"
      onChange={(e) => setStateId(Number(e.target.dataset.value))}
      defaultValue={defaultValue}
      required={required}
    />
  );
};

TrainerClasses.propTypes = {
  setStateId: PropTypes.func,
  defaultValue: PropTypes.any,
  label: PropTypes.string,
  required: PropTypes.bool,
};

export default TrainerClasses;
