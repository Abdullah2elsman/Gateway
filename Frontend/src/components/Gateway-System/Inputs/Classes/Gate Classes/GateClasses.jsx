import {
    clearError,
    createGateClass,
    deleteGateClass,
    fetchGateClasses
} from "@src/store/reducers/Batches/Classes/Gates/GatesSlice";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../Select";

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

  // delete a gate from the system
  const deleteGateHandler = (gateId) => {
    console.log("Delete gate called with ID:", gateId, "Type:", typeof gateId);
    
    if (!gateId) {
      console.error("No gate ID provided");
      ToastError("No gate ID provided");
      return;
    }
    
    const confirmed = window.confirm("Are you sure you want to delete this gate? This will remove it from the system permanently.");
    console.log("User confirmation:", confirmed);
    
    if (confirmed) {
      console.log("User confirmed deletion, dispatching action...");
      dispatch(deleteGateClass(gateId))
        .unwrap()
        .then((response) => {
          console.log("Delete successful:", response);
          ToastSuccess(response.message || "Gate deleted successfully");
          dispatch(fetchGateClasses());
        })
        .catch((error) => {
          console.error("Delete failed:", error);
          console.error("Error details:", error.response?.data || error);
          ToastError(error.message || error || "Failed to delete gate");
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
      onDelete={deleteGateHandler}
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
