import styles from "./Inbox.module.css";
import PropTypes from "prop-types";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Inbox = ({ closeMenu }) => {
  const navigate = useNavigate();

  const { replies } = useSelector((state) => state.Announcements);

  return (
    <div className={styles.Inbox}>
      <div className={styles.title}>
        <h3>Inbox</h3>
      </div>
      <div className={styles.Inbox_content}>
        {replies?.replies?.length < 1 && (
          <p style={{ textAlign: "center", color: "#666" }}>
            There is no reply
          </p>
        )}
        {replies?.replies?.length > 0 &&
          replies?.replies?.map((reply, index) => {
            if (index < 5) {
              return (
                <div key={index} className={styles.content_item}>
                  <div className={styles.item}>
                    <p>{reply.reply}</p>
                    <span>{reply.full_name}</span>
                  </div>
                  <Divider className={styles.divider} />
                </div>
              );
            }
          })}
      </div>

      {/* View All Inbox */}
      <div className={styles.ViewAll}>
        <button onClickCapture={() => navigate("/inbox")} onClick={closeMenu}>
          View All
        </button>
      </div>
    </div>
  );
};

Inbox.propTypes = {
  closeMenu: PropTypes.func,
};

export default Inbox;
