import styles from "./Notification.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Divider } from "@mui/material";

const Notification = ({ closeMenu }) => {
  const navigate = useNavigate();
  const { notifications } = useSelector((state) => state.notifications);

  return (
    <>
      <div className={styles.Notification}>
        <div className={styles.title}>
          <h3>Notification</h3>
        </div>
        <div className={styles.Notification_content}>
          {notifications?.notifications?.length < 1 && (
            <p style={{ textAlign: "center", color: "#666" }}>
              There is no Notifications
            </p>
          )}
          {notifications?.notifications?.length > 0 &&
            notifications?.notifications?.map((notification, index) => {
              if (index < 5) {
                return (
                  <div key={notification.id} className={styles.content_item}>
                    <div className={styles.item}>
                      <p>
                        {notification.full_name} {notification.action}
                      </p>
                    </div>
                    <Divider className={styles.divider} />
                  </div>
                );
              }
            })}
        </div>

        {/* View All Notification */}
        <div className={styles.ViewAll}>
          <button
            onClick={closeMenu}
            onClickCapture={() => navigate("/notification")}
          >
            View All
          </button>
        </div>
      </div>
    </>
  );
};

Notification.propTypes = {
  closeMenu: PropTypes.func,
};

export default Notification;
