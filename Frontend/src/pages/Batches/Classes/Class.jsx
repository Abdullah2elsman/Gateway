import { useEffect, useState } from "react";
import styles from "@styles/Details.module.css";
import AddButton from "@src/components/Gateway-System/AddButton/AddButton";
import PathName from "@src/components/Gateway-System/PathName/PathName";
import AdvancedTable from "@src/components/Gateway-System/Table/AdvancedTable";
import { CiLocationOn } from "react-icons/ci";
import { LuUsers2 } from "react-icons/lu";
import { RiErrorWarningLine } from "react-icons/ri";
import { SiLevelsdotfyi } from "react-icons/si";
import {
  Navigate,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { CloumnsClasses } from "@src/shared/CloumnsTables";
import ActionClass from "@src/components/Gateway-System/Table/Actions/ActionClass";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClass,
  UpdatePayment,
} from "@src/store/reducers/Batches/Classes/ClassesSlice";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import { clearError } from "@src/store/reducers/Branches/BrancheSlice";
import Modals from "@src/components/Gateway-System/Modals/Modals";
import AddSwitchClass from "@src/components/forms/Classes/Swtich Class/AddSwitchClass";
import AddAdminNotes from "@src/components/forms/Classes/Admin Notes/AddAdminNotes";
import { MdOutlineConfirmationNumber } from "react-icons/md";
import checkPermission from "@src/util/CheckPermission";
import { Helmet } from "react-helmet";

const Class = () => {
  const [switch_class, setSwitchClass] = useState({ isOpen: false });
  const [admin_notes, setAdminNotes] = useState({ isOpen: false });

  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { single_class, loading, error } = useSelector(
    (state) => state.classes
  );

  const viewAttendance = () => {
    navigate(`/batch/${state.batchId}/class/${state.class_id}/Attendance`, {
      state: { class_id: state.class_id },
    });
  };

  useEffect(() => {
    dispatch(fetchClass({ batch_id: state.batchId, class_id: state.class_id }));
  }, [dispatch, state]);

  // update payment
  const updatePayment = ({ payment, trainee_id }) => {
    if ((payment, trainee_id)) {
      dispatch(UpdatePayment({ payment, class_id: state.class_id, trainee_id }))
        .unwrap()
        .then(({ message }) => {
          ToastSuccess(message);
          dispatch(
            fetchClass({
              batch_id: state.batchId,
              class_id: state.class_id,
            })
          );
        });
    }
  };

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
      name: "classes",
      children: ["view_classes", "view_own_classes", "view_classes_by_branch"],
    })
  ) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <div className={styles.Details}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${context} | Class`}</title>
      </Helmet>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <PathName path="Class" back={true} style={{ paddingBottom: "0px" }} />
        <AddButton
          title="Go To Attendance"
          name="Go To Attendance"
          openAddModal={viewAttendance}
        />
      </div>

      <div className={styles.details_content}>
        <div className={styles.title}>
          <RiErrorWarningLine className={styles.icon} />
          <h2>Details</h2>
        </div>

        <div className={styles.Batch_title}>
          <h3>{single_class?.class_name}</h3>
          <p style={{ paddingTop: "30px" }}>{single_class?.time_slot}</p>
        </div>
        <div className={styles.content_wapper}>
          <div className={styles.content_info}>
            <div className={styles.info_title}>
              <LuUsers2 className={styles.icon} />
              <h3>Trainer</h3>
            </div>
            <p>{single_class?.trainer}</p>
          </div>

          <div className={styles.content_info}>
            <div className={styles.info_title}>
              <LuUsers2 className={styles.icon} />
              <h3>Trainees</h3>
            </div>
            <p>{single_class?.num_of_trainees}</p>
          </div>

          <div className={styles.content_info}>
            <div className={styles.info_title}>
              <CiLocationOn className={styles.icon} />
              <h3>Gate</h3>
            </div>
            <p>{single_class?.gate}</p>
          </div>

          <div className={styles.content_info}>
            <div className={styles.info_title}>
              <SiLevelsdotfyi className={styles.icon} size={18} />
              <h3>Level</h3>
            </div>
            <p>{single_class?.level}</p>
          </div>

          <div className={styles.content_info}>
            <div className={styles.info_title}>
              <MdOutlineConfirmationNumber className={styles.icon} />
              <h3>Confirmations</h3>
            </div>
            <p>{single_class?.num_of_confirmation}</p>
          </div>
        </div>
      </div>

      {/* table Class */}
      <div className={styles.trainees}>
        <div className={styles.title}>
          <RiErrorWarningLine className={styles.icon} />
          <h2>Trainees</h2>
        </div>

        {/* Modal Swtich Class */}
        {checkPermission({
          name: "classes",
          children: ["switch_class", "switch_class_by_branch"],
        }) && (
          <Modals
            isOpen={switch_class?.isOpen}
            handleClose={() => setSwitchClass({ isOpen: false })}
          >
            <AddSwitchClass
              branch={single_class?.branch}
              trainee_id={switch_class?.trainee_id}
              batch_id={state.batchId}
              class_id={state.class_id}
              handleClose={() => setSwitchClass({ isOpen: false })}
            />
          </Modals>
        )}

        {/* Modal Admin Notes */}
        {checkPermission({
          name: "classes",
          children: ["add_admin_note", "add_admin_note_by_branch"],
        }) && (
          <Modals
            isOpen={admin_notes?.isOpen}
            handleClose={() => setAdminNotes({ isOpen: false })}
          >
            <AddAdminNotes
              trainee_id={admin_notes?.trainee_id}
              batch_id={state.batchId}
              class_id={state.class_id}
              admin_note={admin_notes?.admin_note}
              handleClose={() => setAdminNotes({ isOpen: false })}
            />
          </Modals>
        )}

        <div className={styles.table}>
          <AdvancedTable
            columns={CloumnsClasses(updatePayment)}
            rows={
              (single_class?.trainees?.length > 0 && single_class?.trainees) ||
              []
            }
            Actions={
              <ActionClass
                batch_id={state?.batchId}
                class_id={state?.class_id}
                openSwitchClass={(trainee_id) =>
                  setSwitchClass({ isOpen: true, trainee_id })
                }
                openAdminNotes={({ trainee_id, admin_note }) =>
                  setAdminNotes({ isOpen: true, trainee_id, admin_note })
                }
              />
            }
            isLoading={loading}
            enableRowSelection={true}
            enableRowActions={true}
            type="class"
          />
        </div>
      </div>
    </div>
  );
};

export default Class;
