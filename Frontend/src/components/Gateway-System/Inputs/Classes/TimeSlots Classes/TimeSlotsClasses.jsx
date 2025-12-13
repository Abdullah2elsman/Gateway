import {
    clearError,
    createTimeSlotInClass,
    deleteTimeSlotInClass,
    fetchTimeSlotsInClass
} from "@src/store/reducers/Batches/Classes/TimeSlots/TimeSlots";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../Select";

const TimeSlotsClasses = ({
  label,
  Button,
  setStateId,
  defaultValue,
  attend_type,
  required,
  showRemoveButton = false, // ✅ NEW: configurable remove button
}) => {
  const dispatch = useDispatch();
  const { timeSlots_classes, error, isLoading } = useSelector(
    (state) => state.timeSlotClassesSlice
  );

  useEffect(() => {
    attend_type && dispatch(fetchTimeSlotsInClass(attend_type));
  }, [dispatch, attend_type]);

  const AddNewTimeSlottoClasses = (data) => {
    dispatch(createTimeSlotInClass({ time_slot: data, attend_type }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchTimeSlotsInClass(attend_type));
      });
  };

  // delete a time slot from the system
  const deleteTimeSlotHandler = (timeSlotId) => {
    console.log("Delete time slot called with ID:", timeSlotId, "Type:", typeof timeSlotId);
    
    if (!timeSlotId) {
      console.error("No time slot ID provided");
      ToastError("No time slot ID provided");
      return;
    }
    
    const confirmed = window.confirm("Are you sure you want to delete this time slot? This will remove it from the system permanently.");
    console.log("User confirmation:", confirmed);
    
    if (confirmed) {
      console.log("User confirmed deletion, dispatching action...");
      dispatch(deleteTimeSlotInClass(timeSlotId))
        .unwrap()
        .then((response) => {
          console.log("Delete successful:", response);
          ToastSuccess(response.message || "Time slot deleted successfully");
          dispatch(fetchTimeSlotsInClass(attend_type));
        })
        .catch((error) => {
          console.error("Delete failed:", error);
          console.error("Error details:", error.response?.data || error);
          ToastError(error.message || error || "Failed to delete time slot");
        });
    } else {
      console.log("User canceled deletion");
    }
  };

  useEffect(() => {
    if (error) {
      ToastError(error.message);
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  return (
    <Select
      id="time_id"
      name="Time Slot"
      label={label}
      options={timeSlots_classes?.map((timeslot) => ({
        id: timeslot.id,
        label: timeslot.time_slot,
      }))}
      placeholder="Time Slot"
      Button={Button}
      showRemoveButton={showRemoveButton}
      onSubmitNew={AddNewTimeSlottoClasses}
      onDelete={deleteTimeSlotHandler}
      onChange={(e) => setStateId(Number(e.target.dataset.value))}
      loading={isLoading}
      defaultValue={defaultValue}
      required={required}
    />
  );
};

TimeSlotsClasses.propTypes = {
  setStateId: PropTypes.func,
  defaultValue: PropTypes.any,
  attend_type: PropTypes.string,
  label: PropTypes.string,
  Button: PropTypes.bool,
  required: PropTypes.bool,
  showRemoveButton: PropTypes.bool,
};

export default TimeSlotsClasses;
