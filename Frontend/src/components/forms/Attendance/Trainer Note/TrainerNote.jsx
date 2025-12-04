import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import Input from "@src/components/Gateway-System/Inputs/Input";
import { useDispatch } from "react-redux";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import {
  createTrainerNote,
  fetchAttendance,
} from "@src/store/reducers/Attendance/AttendanceSlice";
import { ToastSuccess } from "@src/util/Toast";

const TrainerNote = ({
  class_id,
  trainee_id,
  handleClose,
  trainer_note,
  isLoading,
}) => {
  const dispatch = useDispatch();

  const onSubmitAddTrainerNote = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(
      createTrainerNote({
        class_id,
        trainee_id,
        trainer_note: data.get("trainer_note"),
      })
    )
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchAttendance(class_id));
        handleClose();
      });
  };

  return (
    <Box
      component={"form"}
      onSubmit={onSubmitAddTrainerNote}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "30px 0 10px",
      }}
    >
      <Input
        id="trainer_note"
        label="Trainer Note"
        placeholder="Add trainer note"
        defaultValue={trainer_note || ""}
      />

      <Button type="submit" variant="contained" sx={{ gap: 1 }}>
        {isLoading && <Spinner />} Add Trainer Note
      </Button>
    </Box>
  );
};

TrainerNote.propTypes = {
  class_id: PropTypes.number,
  trainee_id: PropTypes.number,
  trainer_note: PropTypes.string,
  isLoading: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default TrainerNote;
