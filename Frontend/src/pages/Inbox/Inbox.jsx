import { useEffect } from "react";
import styles from "@components/Gateway-System/Inbox/Inbox.module.css";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchReplies } from "@src/store/reducers/Announcements/AnnouncementsSlice";
import { Navigate, useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet";
import checkPermission from "@src/util/CheckPermission";

const Inbox = () => {
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { replies } = useSelector((state) => state.Announcements);

  useEffect(() => {
    dispatch(fetchReplies());
  }, [dispatch]);

  if (
    !checkPermission({
      name: "announcements",
      children: ["view_announcement_replies"],
    })
  ) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <div style={{ padding: "50px 20px" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${context} | Inbox`}</title>
      </Helmet>

      <div className={`${styles.Inbox} ${styles.pageInbox}`}>
        <div className={styles.title}>
          <h3 style={{ color: "var(--text-gray)" }}>Inbox</h3>
        </div>
        <div className={styles.Inbox_content}>
          {replies?.replies?.length < 1 && (
            <p style={{ textAlign: "center", color: "var(--text-gray)" }}>
              There is no reply
            </p>
          )}
          {replies?.replies?.length > 0 &&
            replies?.replies?.map((reply) => {
              return (
                <div key={reply.id} className={styles.content_item}>
                  <div className={styles.item}>
                    <p style={{ color: "var(--text-black)" }}>{reply.reply}</p>
                    <span style={{ color: "var(--text-gray)" }}>
                      {reply.full_name}
                    </span>
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

export default Inbox;
