import { useEffect } from "react";
import PropTypes from "prop-types";
import Select from "../../Select";
import { useDispatch, useSelector } from "react-redux";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import {
  clearError,
  createTimeSlotInClass,
  fetchTimeSlotsInClass,
} from "@src/store/reducers/Batches/Classes/TimeSlots/TimeSlots";

const TimeSlotsClasses = ({
  label,
  Button,
  setStateId,
  defaultValue,
  attend_type,
  required,
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
      onSubmitNew={AddNewTimeSlottoClasses}
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
};

export default TimeSlotsClasses;
