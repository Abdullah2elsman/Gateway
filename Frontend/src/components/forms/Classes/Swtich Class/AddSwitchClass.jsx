import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  updateSwitchClasses,
} from "@src/store/reducers/Batches/Classes/Move/MoveClassSlice";
import Select from "@src/components/Gateway-System/Inputs/Select";
import { Box, Button } from "@mui/material";
import {
  fetchClass,
  filterClasses,
} from "@src/store/reducers/Batches/Classes/ClassesSlice";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import GateClasses from "@src/components/Gateway-System/Inputs/Classes/Gate Classes/GateClasses";
import TimeSlotsClasses from "@src/components/Gateway-System/Inputs/Classes/TimeSlots Classes/TimeSlotsClasses";
import LevelClasses from "@src/components/Gateway-System/Inputs/Classes/Level Classes/LevelClasses";
import TrainerClasses from "@src/components/Gateway-System/Inputs/Classes/TrainerClasses/TrainerClasses";
import Alert from "@src/components/feedback/Alert/Alert";

const AddSwitchClass = ({
  branch,
  batch_id,
  class_id,
  trainee_id,
  handleClose,
  type,
  onBulk,
  loading,
}) => {
  const [class_Id, setClassId] = useState("");
  const [level_id, setLevelID] = useState("");
  const [gate_id, setGateID] = useState("");
  const [timeSlot_id, setTimeSlotID] = useState("");
  const [trainer_id, setTrainerID] = useState("");
  const [class_type, setClassType] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.moveClass);
  const { classes } = useSelector((state) => state.classes);

  useEffect(() => {
    dispatch(
      filterClasses({
        batch_id,
        filter: {
          branch,
          class_id,
          class_type,
          level: level_id,
          gate: gate_id,
          time_slot: timeSlot_id,
          trainer_id,
        },
      })
    );
  }, [
    dispatch,
    branch,
    batch_id,
    class_id,
    class_type,
    level_id,
    gate_id,
    timeSlot_id,
    trainer_id,
  ]);

  const handlerDispatch = useCallback(() => {
    dispatch(
      updateSwitchClasses({
        old_class: class_id,
        class_id: class_Id,
        trainee_id,
      })
    )
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        handleClose();
        dispatch(fetchClass({ batch_id, class_id }));
      });
  }, [class_Id, trainee_id, class_id, batch_id, dispatch, handleClose]);

  const HandleOnBluk = useCallback(() => {
    onBulk(class_Id);
    handleClose();
    setIsOpen(false);
  }, [class_Id, handleClose, onBulk]);

  const onSubmitSwitchClass = useCallback(
    (e) => {
      e.preventDefault();

      const Trainees = classes?.classes?.find((Class) => Class.id === class_Id);

      if (Trainees?.num_of_trainees >= 10) {
        setIsOpen(true);
        return;
      } else {
        type === "bulkClass" ? HandleOnBluk() : handlerDispatch();
      }
    },
    [handlerDispatch, class_Id, classes, type, HandleOnBluk]
  );

  useEffect(() => {
    if (error) {
      ToastError(error?.message);
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  return (
    <>
      {isOpen && (
        <Alert
          isOpen={isOpen}
          zIndex={999999}
          Continue={() =>
            type === "bulkClass" ? HandleOnBluk() : handlerDispatch()
          }
          Cancel={() => setIsOpen(false)}
          isLoading={isLoading}
        />
      )}

      <Box
        component={"form"}
        onSubmit={onSubmitSwitchClass}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: "30px 0 10px",
        }}
      >
        <Select
          id="class_type"
          label="Class Type"
          options={[
            { id: 1, label: "Online" },
            { id: 2, label: "Offline" },
            { id: 3, label: "Hybrid" },
            { id: 4, label: "Private" },
          ]}
          placeholder="Class Type"
          onChange={(e, v) => setClassType(v?.label)}
        />

        <GateClasses setStateId={setGateID} Button={false} label="Gate" />

        <TimeSlotsClasses
          label="Time Slot"
          setStateId={setTimeSlotID}
          attend_type={class_type}
          button={false}
        />

        <LevelClasses label="Level" Button={false} setStateId={setLevelID} />

        <TrainerClasses label="Trainer" setStateId={setTrainerID} />

        <Select
          id="class_id"
          label="Classes"
          options={
            (classes?.classes?.length &&
              classes?.classes?.map((Class) => ({
                id: Class.id,
                label: `${Class.class_name} - No. ${Class.num_of_trainees}`,
              }))) ||
            []
          }
          placeholder="Choose a class"
          onChange={(e) => setClassId(Number(e.target.dataset.value))}
        />
        <Button type="submit" variant="contained" sx={{ gap: 1 }}>
          {(loading || isLoading) && <Spinner />} Switch Class
        </Button>
      </Box>
    </>
  );
};

AddSwitchClass.propTypes = {
  branch: PropTypes.string,
  class_id: PropTypes.number.isRequired,
  batch_id: PropTypes.number.isRequired,
  trainee_id: PropTypes.number,
  handleClose: PropTypes.func,
  type: PropTypes.string,
  onBulk: PropTypes.func,
  loading: PropTypes.bool,
};

export default AddSwitchClass;
