import { useEffect } from "react";
import styles from "@styles/Details.module.css";
import PathName from "@src/components/Gateway-System/PathName/PathName";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  fetchAttendanceTrainer,
} from "@src/store/reducers/Attendance/AttendanceSlice";
import { ToastError } from "@src/util/Toast";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import checkPermission from "@src/util/CheckPermission";
import { Helmet } from "react-helmet";

const Trainer_Attendance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useOutletContext();

  const { trainer_attendance, error } = useSelector(
    (state) => state.Attendance
  );

  useEffect(() => {
    dispatch(fetchAttendanceTrainer());
  }, [dispatch]);

  // Show error message
  useEffect(() => {
    if (error) {
      ToastError(error?.message);
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  if (
    !checkPermission({
      name: "attendance",
      children: ["view_trainer_attendance"],
    }) ||
    (checkPermission({
      name: "attendance",
      children: ["view_attendance"],
    }) &&
      checkPermission({
        name: "attendance",
        children: ["view_trainer_attendance"],
      }))
  ) {
    return <Navigate to="*" replace />;
  }

  return (
    <div className={styles.Details}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${context} | Trainer Classes`}</title>
      </Helmet>

      <PathName path="Attendance" back={true} />

      <div className={styles.Classes} style={{ paddingTop: "50px" }}>
        {trainer_attendance?.message && (
          <p style={{ textAlign: "center", color: "var(--text-gray)" }}>Attendances is empty.</p>
        )}
        <div className={styles.Classes_content}>
          {trainer_attendance?.attendances?.map((attendance) => (
            <div key={attendance.id} className={styles.class_item}>
              <div className={styles.item_title}>
                <h4>{attendance.class_name}</h4>
              </div>

              <p>{attendance.time_slot}</p>

              <div className={styles.item_bottom}>
                <button
                  className={styles.button}
                  onClick={() =>
                    navigate(`/trainer-attendance/${attendance.id}`, {
                      state: { id: attendance.id },
                    })
                  }
                >
                  View Attendance
                </button>
                <p>Trainees: {attendance.num_of_trainees}</p>

                <p>Confirmations: {attendance.num_of_confirmation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trainer_Attendance;
