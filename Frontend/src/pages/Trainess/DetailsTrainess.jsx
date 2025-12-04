import PathName from "@src/components/Gateway-System/PathName/PathName";
import styles from "@styles/Details.module.css";
import { FaChalkboardUser, FaCodeBranch, FaUser } from "react-icons/fa6";
import {
  MdMarkEmailRead,
  MdOutlineDateRange,
  MdOutlinePaid,
  MdOutlinePhoneInTalk,
} from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { Navigate, useLocation, useOutletContext } from "react-router-dom";
import { GrNotes } from "react-icons/gr";
import { PiStudent } from "react-icons/pi";
import { CiCreditCard1, CiLocationOn } from "react-icons/ci";
import { RiErrorWarningLine } from "react-icons/ri";
import { GiShadowFollower } from "react-icons/gi";
import checkPermission from "@src/util/CheckPermission";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleTrainee } from "@src/store/reducers/Trainees/TraineesSlice";
import { SiLevelsdotfyi } from "react-icons/si";

const DetailsTrainess = () => {
  const context = useOutletContext();

  const { state } = useLocation();
  const dispatch = useDispatch();

  const { single_trainee, isLoading, error } = useSelector((state) => state.Trainees);

  useEffect(() => {
    if (state?.trainee_id) {
      dispatch(fetchSingleTrainee(state.trainee_id));
    }
  }, [dispatch, state?.trainee_id]);

  if (
    !checkPermission({
      name: "trainees",
      children: ["view_trainees", "view_trainees_by_branch"],
    })
  ) {
    return <Navigate to="*" replace />;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className={styles.Details}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`${context} | Details Trainees`}</title>
        </Helmet>
        <PathName path="Traniess" back={true} />
        <div className={styles.details_content}>
          <div className={styles.title}>
            <RiErrorWarningLine className={styles.icon} />
            <h2>Details</h2>
          </div>
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p>Loading trainee details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !single_trainee?.id) {
    return (
      <div className={styles.Details}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`${context} | Details Trainees`}</title>
        </Helmet>
        <PathName path="Traniess" back={true} />
        <div className={styles.details_content}>
          <div className={styles.title}>
            <RiErrorWarningLine className={styles.icon} />
            <h2>Details</h2>
          </div>
          <div style={{ textAlign: "center", padding: "40px", color: "red" }}>
            <p>{error?.message || error?.error || "Failed to load trainee details"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.Details}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${context} | Details Trainees`}</title>
      </Helmet>

      <PathName path="Traniess" back={true} />
      <div className={styles.details_content}>
        <div className={styles.title}>
          <RiErrorWarningLine className={styles.icon} />
          <h2>Details</h2>
        </div>

        <div className={styles.content_wapper}>
          <div className={styles.content_info}>
            <div className={styles.info_title}>
              <FaUser className={styles.icon} />
              <h3>Full Name</h3>
            </div>
            <p>{single_trainee?.full_name}</p>
          </div>

          <div className={styles.content_info}>
            <div className={styles.info_title}>
              <FaChalkboardUser className={styles.icon} />
              <h3>Assigned Trainer</h3>
            </div>
            <p>{single_trainee?.trainer}</p>
          </div>

          {single_trainee?.email && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <MdMarkEmailRead className={styles.icon} />
                <h3>Email</h3>
              </div>
              <p>{single_trainee?.email}</p>
            </div>
          )}

          {single_trainee?.phone_number_0 && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <MdOutlinePhoneInTalk className={styles.icon} />
                <h3>Mobile</h3>
              </div>
              <p>{single_trainee?.phone_number_0}</p>
            </div>
          )}

          {single_trainee?.phone_number_1 && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <MdOutlinePhoneInTalk className={styles.icon} />
                <h3>Second Mobile</h3>
              </div>
              <p>{single_trainee?.phone_number_1}</p>
            </div>
          )}

          {single_trainee?.branch && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <FaCodeBranch className={styles.icon} />
                <h3>Branch</h3>
              </div>
              <p>{single_trainee?.branch}</p>
            </div>
          )}

          {single_trainee?.status && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <FiCheckCircle className={styles.icon} />
                <h3>Status</h3>
              </div>
              <p>{single_trainee?.status || "N/A"}</p>
            </div>
          )}

          {single_trainee?.payment_type && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <CiCreditCard1 className={styles.icon} />
                <h3>Payment Type</h3>
              </div>
              <p>{single_trainee?.payment_type}</p>
            </div>
          )}

          {single_trainee?.preferable_time && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <MdOutlineDateRange className={styles.icon} />
                <h3>Preferred Time of Slot</h3>
              </div>
              <p>{single_trainee?.preferable_time}</p>
            </div>
          )}

          {single_trainee?.sec_preferable_time && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <MdOutlineDateRange className={styles.icon} />
                <h3>Second Preferred Time of Slot</h3>
              </div>
              <p>{single_trainee?.sec_preferable_time}</p>
            </div>
          )}

          {single_trainee?.level && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <SiLevelsdotfyi className={styles.icon} />
                <h3>Level</h3>
              </div>
              <p>{single_trainee?.level}</p>
            </div>
          )}

          {single_trainee?.payment_type && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <CiCreditCard1 className={styles.icon} />
                <h3>Payment Type</h3>
              </div>
              <p>{single_trainee?.payment_type}</p>
            </div>
          )}

          {single_trainee?.paid_value && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <MdOutlinePaid className={styles.icon} />
                <h3>Paid Value</h3>
              </div>
              <p>{single_trainee?.paid_value}</p>
            </div>
          )}

          {single_trainee?.remaining_value && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <MdOutlinePaid className={styles.icon} />
                <h3>Remaining Value</h3>
              </div>
              <p>{single_trainee?.remaining_value}</p>
            </div>
          )}

          {single_trainee?.attend_type && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <MdOutlineDateRange className={styles.icon} />
                <h3>Attend Type</h3>
              </div>
              <p>{single_trainee?.attend_type}</p>
            </div>
          )}

          {single_trainee?.age_group && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <GrNotes className={styles.icon} />
                <h3>Age Group</h3>
              </div>
              <p>{single_trainee?.age_group}</p>
            </div>
          )}

          {single_trainee?.test_date && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <MdOutlineDateRange className={styles.icon} />
                <h3>Test Date</h3>
              </div>
              <p>{single_trainee?.test_date}</p>
            </div>
          )}

          {single_trainee?.brith_date && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <MdOutlineDateRange className={styles.icon} />
                <h3>Brith Date</h3>
              </div>
              <p>{single_trainee?.brith_date}</p>
            </div>
          )}

          {single_trainee?.education && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <PiStudent className={styles.icon} />
                <h3>Education</h3>
              </div>
              <p>{single_trainee?.education}</p>
            </div>
          )}

          {single_trainee?.job && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <FaCodeBranch className={styles.icon} />
                <h3>Job</h3>
              </div>
              <p>{single_trainee?.job}</p>
            </div>
          )}

          {single_trainee?.country && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <CiLocationOn className={styles.icon} />
                <h3>Location</h3>
              </div>
              <p>{single_trainee?.country}</p>
            </div>
          )}

          {single_trainee?.city && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <CiLocationOn className={styles.icon} />
                <h3>City</h3>
              </div>
              <p>{single_trainee?.city}</p>
            </div>
          )}

          {single_trainee?.follow_up && (
            <div className={styles.content_info}>
              <div className={styles.info_title}>
                <GiShadowFollower className={styles.icon} />
                <h3>Who Follow Up</h3>
              </div>
              <p>{single_trainee?.follow_up}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsTrainess;
