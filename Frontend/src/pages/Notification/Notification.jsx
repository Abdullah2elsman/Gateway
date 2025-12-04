import styles from "@components/Gateway-System/Inbox/Inbox.module.css";
import { Helmet } from "react-helmet";
import { Navigate, useOutletContext } from "react-router-dom";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { checkNotifications } from "@src/util/CheckPermission";

const Notification = () => {
  const context = useOutletContext();
  const { notifications } = useSelector((state) => state.notifications);

  if (!checkNotifications()) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <div style={{ padding: "50px 20px" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${context} | Notifications`}</title>
      </Helmet>

      <div className={`${styles.Inbox} ${styles.pageInbox}`}>
        <div className={styles.title}>
          <h3 style={{ color: "var(--text-gray)" }}>Notification</h3>
        </div>
        <div className={styles.Inbox_content}>
          {notifications?.notifications?.length < 1 && (
            <p style={{ textAlign: "center", color: "var(--text-gray)" }}>
              There is no Notifications
            </p>
          )}
          {notifications?.notifications?.length > 0 &&
            notifications?.notifications?.map((notification) => {
              return (
                <div
                  key={notification.id}
                  className={styles.content_item}
                  style={{ marginBottom: "20px" }}
                >
                  <div className={styles.item}>
                    <p style={{ color: "var(--text-black)" }}>
                      {notification.full_name} {notification.action}
                    </p>
                  </div>
                  <Divider className={styles.divider} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Notification;
