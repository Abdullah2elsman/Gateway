import { useEffect } from "react";
import styles from "@styles/Details.module.css";
import PathName from "@src/components/Gateway-System/PathName/PathName";
import { Navigate, useLocation, useOutletContext } from "react-router-dom";
import { RiErrorWarningLine } from "react-icons/ri";
import { LuUsers2 } from "react-icons/lu";
import { CiLocationOn, CiLock } from "react-icons/ci";
import AdvancedTable from "@src/components/Gateway-System/Table/AdvancedTable";
import { CloumnsAttendance } from "@src/shared/CloumnsTables";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  createTrainerNote,
  fetchAttendance,
} from "@src/store/reducers/Attendance/AttendanceSlice";
import { SiLevelsdotfyi } from "react-icons/si";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import {
  MdOutlineAccountBalance,
  MdOutlineConfirmationNumber,
} from "react-icons/md";
import checkPermission from "@src/util/CheckPermission";
import { Helmet } from "react-helmet";

const Attendance = () => {
  const { state } = useLocation();

  const dispatch = useDispatch();
  const context = useOutletContext();

  const { attendance, error, isLoading } = useSelector(
    (state) => state.Attendance
  );

  useEffect(() => {
    dispatch(fetchAttendance({ class_id: state?.class_id }));
  }, [dispatch, state]);

  // Show error message
  useEffect(() => {
    if (error) {
      ToastError(error?.message);
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  // Create comment
  const updateComment = (comment) => {
    dispatch(
      createTrainerNote({
        class_id: state?.class_id,
        trainee_id: comment.trainee_id,
        comment: comment.comment,
      })
    )
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchAttendance({ class_id: state?.class_id }));
      });
  };

  if (
    !checkPermission({
      name: "attendance",
      children: ["view_attendance", "view_attendance_by_branch"],
    })
  ) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <div className={styles.Details}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${context} | Attendance`}</title>
      </Helmet>

      <PathName path="Attendance" back={true} />
      <div className={styles.details_content}>
        <div className={styles.title}>
          <RiErrorWarningLine className={styles.icon} />
          <h2>Details</h2>
        </div>

        <div className={styles.Batch_title}>
          <h3>{attendance?.class_name}</h3>
          {attendance?.gate_url && attendance?.gate_password && (
            <div className={styles.Batch_title} style={{ paddingTop: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  paddingTop: "5px",
                }}
              >
                <MdOutlineAccountBalance size={23} color="var(--text-gray)" />
                <p>
                  <strong>Gate Account: </strong>
                  {attendance?.gate_url}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  paddingTop: "10px",
                }}
              >
                <CiLock size={23} color="var(--text-gray)" />
                <p>
                  <strong>Password: </strong> {attendance?.gate_password}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.content_wapper}>
          <div className={styles.content_info}>
            <div className={styles.info_title}>
              <LuUsers2 className={styles.icon} />
              <h3>Trainer</h3>
            </div>
            <p>{attendance?.trainer}</p>
          </div>

          <div className={styles.content_info}>
            <div className={styles.info_title}>
              <LuUsers2 className={styles.icon} />
              <h3>Trainees</h3>
            </div>
            <p>{attendance?.num_of_trainees}</p>
          </div>

          <div className={styles.content_info}>
            <div className={styles.info_title}>
              <CiLocationOn className={styles.icon} />
              <h3>Gate</h3>
            </div>
            <p>{attendance?.gate}</p>
          </div>

          <div className={styles.content_info}>
            <div className={styles.info_title}>
              <SiLevelsdotfyi className={styles.icon} size={18} />
              <h3>Level</h3>
            </div>
            <p>{attendance?.level}</p>
          </div>

          <div className={styles.content_info}>
            <div className={styles.info_title}>
              <MdOutlineConfirmationNumber className={styles.icon} />
              <h3>Confirmation</h3>
            </div>
            <p>{attendance?.num_of_confirmation}</p>
          </div>
        </div>
      </div>

      {/* Table Attendance */}
      <div className={styles.trainees}>
        <div className={styles.title}>
          <RiErrorWarningLine className={styles.icon} />
          <h2>Attendance</h2>
        </div>

        <div className={styles.table}>
          <AdvancedTable
            columns={CloumnsAttendance(
              state?.class_id,
              "attendance",
              updateComment
            )}
            rows={(!attendance?.message && attendance?.trainees) || []}
            isLoading={isLoading}
            enableRowSelection={false}
            enableRowActions={false}
            LeftPinning={["full_name"]}
          />
        </div>
      </div>
    </div>
  );
};

export default Attendance;
