import Title from "../Title/Title";
import styles from "./Batches.module.css";
import { GrValidate } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { IoMdArchive } from "react-icons/io";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBatches } from "@src/store/reducers/Batches/BatchesSlice";

const Batches = () => {
  const dispatch = useDispatch();
  const { batches } = useSelector((state) => state.batches);

  useEffect(() => {
    dispatch(fetchBatches());
  }, [dispatch]);

  return (
    <div className={styles.Batches}>
      <Title title="Batches" />

      {batches?.message && (
        <p style={{ textAlign: "center" }}>{batches?.message}</p>
      )}

      {batches?.active?.map((batch) => (
        <div className={styles.Batches_info} key={batch.id}>
          <div className={styles.info_wapper}>
            <h4>Review Candidate applications</h4>

            <div className={styles.Batch_active}>
              <GrValidate
                className={[`${styles.icon_active} ${styles.active}`]}
              />
              <span>Active</span>
            </div>
          </div>

          <div className={styles.Batches_Date}>
            <div className={styles.Date_Wapper}>
              <div className={styles.Date}>
                <div className={styles.Date_title}>
                  <div className={styles.icon_date}>
                    <MdDateRange className={styles.icon} />
                  </div>
                  <span>Start Date</span>
                </div>
                <p>{batch.start_date}</p>
              </div>
            </div>

            <div className={styles.Date_Wapper}>
              <div className={styles.Date}>
                <div className={styles.Date_title}>
                  <div className={styles.icon_date}>
                    <FaLocationDot className={styles.icon} />
                  </div>
                  <span>Branch</span>
                </div>
                <p>{batch.batch_title}</p>
              </div>
            </div>

            <div className={styles.Date_Wapper}>
              <div className={styles.Date}>
                <div className={styles.Date_title}>
                  <div className={styles.icon_date}>
                    <FaUsers className={styles.icon} />
                  </div>
                  <span>No. Classes</span>
                </div>
                <p>{batch.num_classes}</p>
              </div>
            </div>

            <div className={styles.Date_Wapper}>
              <div className={styles.Date}>
                <div className={styles.Date_title}>
                  <div className={styles.icon_date}>
                    <MdDateRange className={styles.icon} />
                  </div>
                  <span>End Date</span>
                </div>
                <p>{batch.end_date}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {batches?.archive?.map((batch, index) => {
        if ((!batches?.active && index < 5) || (batches?.active && index < 4)) {
          return (
            <div className={styles.Batches_info} key={batch.id}>
              <div className={styles.info_wapper}>
                <h4>Review Candidate applications</h4>
                <div className={styles.Batch_active}>
                  <IoMdArchive className={styles.icon_active} />
                  <span>Archive</span>
                </div>
              </div>

              <div className={styles.Batches_Date}>
                <div className={styles.Date_Wapper}>
                  <div className={styles.Date}>
                    <div className={styles.Date_title}>
                      <div className={styles.icon_date}>
                        <MdDateRange className={styles.icon} />
                      </div>
                      <span>Start Date</span>
                    </div>
                    <p>{batch.start_date}</p>
                  </div>
                </div>

                <div className={styles.Date_Wapper}>
                  <div className={styles.Date}>
                    <div className={styles.Date_title}>
                      <div className={styles.icon_date}>
                        <FaLocationDot className={styles.icon} />
                      </div>
                      <span>Branch</span>
                    </div>
                    <p>{batch.batch_title}</p>
                  </div>
                </div>

                <div className={styles.Date_Wapper}>
                  <div className={styles.Date}>
                    <div className={styles.Date_title}>
                      <div className={styles.icon_date}>
                        <FaUsers className={styles.icon} />
                      </div>
                      <span>No. Classes</span>
                    </div>
                    <p>{batch.num_classes}</p>
                  </div>
                </div>

                <div className={styles.Date_Wapper}>
                  <div className={styles.Date}>
                    <div className={styles.Date_title}>
                      <div className={styles.icon_date}>
                        <MdDateRange className={styles.icon} />
                      </div>
                      <span>End Date</span>
                    </div>
                    <p>{batch.end_date}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Batches;
