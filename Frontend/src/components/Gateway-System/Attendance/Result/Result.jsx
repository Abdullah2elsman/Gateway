import { useEffect, useState } from "react";
import styles from "./Result.module.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { FaAngleDown } from "react-icons/fa6";
import {
  createTrainerNote,
  fetchAttendance,
  fetchAttendanceTrainer,
} from "@src/store/reducers/Attendance/AttendanceSlice";
import { ToastSuccess } from "@src/util/Toast";

const Result = ({ row, class_id, type }) => {
  const [result_value, setResultValue] = useState("");
  const dispatch = useDispatch();

  const handlerChange = (e) => {
    setResultValue(e.target.value);

    dispatch(
      createTrainerNote({
        class_id,
        trainee_id: row.id,
        trainer_note: e.target.value,
      })
    )
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        type === "trainer_attendance" && dispatch(fetchAttendanceTrainer());
        type === "attendance" && dispatch(fetchAttendance({ class_id }));
      });
  };

  useEffect(() => {
    setResultValue(row.trainer_note);
  }, [row]);

  return (
    <div className={styles.Result}>
      <select
        className={
          result_value === "No Show" ? styles.No : styles[result_value]
        }
        onChange={handlerChange}
        defaultValue={row?.trainer_note}
      >
        <option value="">Choose</option>
        <option value="No Show">No Show</option>
        <option value="Passed">Passed</option>
        <option value="Failed">Failed</option>
        <option value="Undertest">Undertest</option>
        <option value="Re">Re</option>
        <option value="Postponed">Postponed</option>
        <option value="Downgrade">Downgrade</option>
        <option value="Upgrade">Upgrade</option>
      </select>
      <div className={styles.icons}>
        <FaAngleDown />
      </div>
    </div>
  );
};

Result.propTypes = {
  row: PropTypes.object.isRequired,
  class_id: PropTypes.number,
  type: PropTypes.string,
};

export default Result;
