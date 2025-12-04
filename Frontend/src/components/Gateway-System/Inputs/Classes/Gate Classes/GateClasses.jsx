import { useEffect } from "react";
import PropTypes from "prop-types";
import Select from "../../Select";
import { useDispatch, useSelector } from "react-redux";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import {
  clearError,
  createGateClass,
  fetchGateClasses,
} from "@src/store/reducers/Batches/Classes/Gates/GatesSlice";

const GateClasses = ({ setStateId, defaultValue, Button, label, required }) => {
  const dispatch = useDispatch();
  const { gate_classes, error, loading } = useSelector(
    (state) => state.gatesClassesSlice
  );

  useEffect(() => {
    dispatch(fetchGateClasses());
  }, [dispatch]);

  const AddNewGatetoClasses = (data) => {
    dispatch(createGateClass({ gate: data }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchGateClasses());
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
      id="gate_id"
      name="gate"
      label={label}
      options={gate_classes?.map((gate) => ({
        id: gate.id,
        label: gate.gate_name,
      }))}
      placeholder="Gate"
      Button={Button}
      onSubmitNew={AddNewGatetoClasses}
      onChange={(e) => setStateId(Number(e.target.dataset.value))}
      loading={loading}
      defaultValue={defaultValue}
      required={required}
    />
  );
};

GateClasses.propTypes = {
  setStateId: PropTypes.func.isRequired,
  defaultValue: PropTypes.any,
  Button: PropTypes.bool,
  label: PropTypes.string,
  required: PropTypes.bool,
};

export default GateClasses;
