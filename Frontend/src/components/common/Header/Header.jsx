import propTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

import sound from "@assets/Sound/notification-sound.mp3";
import Avatar from "@assets/image/Avatar.png";
import CustomizedMenus from "@components/Gateway-System/CustomizedMenus/CustomizedMenus";
import { Button, Divider, IconButton, MenuItem } from "@mui/material";
import Inbox from "@src/components/Gateway-System/Inbox/Inbox";
import Notification from "@src/components/Gateway-System/Notification/Notification";
import Search from "@src/components/Gateway-System/Search/Search";
import { fetchReplies } from "@src/store/reducers/Announcements/AnnouncementsSlice";
import { createLogOut } from "@src/store/reducers/Auth/Login/LoginSlice";
import { getUserSelf } from "@src/store/reducers/Auth/Profile/ProfileSlice";
import { fetchNotifications } from "@src/store/reducers/Notification/NotificationSlice";
import checkPermission, { checkNotifications } from "@src/util/CheckPermission";
import { ToastSuccess } from "@src/util/Toast";
import { UserData } from "@src/util/UserData";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaMessage } from "react-icons/fa6";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoNotifications } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderMobile from "../HeaderMobile/HeaderMobile";

const Header = ({ handleOpenMenu }) => {
  const [profiles, setProfiles] = useState(null);
  const [notification, setNotification] = useState(null);
  const [inbox, setInbox] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.profile);
  const { replies } = useSelector((state) => state.Announcements);
  const { notifications } = useSelector((state) => state.notifications);
  const { token, user } = UserData();

  useEffect(() => {
    checkPermission({
      name: "users",
      children: ["view_self"],
    }) && dispatch(getUserSelf());

    checkPermission({
      name: "announcements",
      children: ["view_announcement_replies"],
    }) && dispatch(fetchReplies());

    checkNotifications() && dispatch(fetchNotifications());
  }, [dispatch]);

  // inbox real time
  useEffect(() => {
    const audio = new Audio(sound);
    if (token) {
      window.Pusher = Pusher;

      const OriginalRuntime = window.Pusher.Runtime;
      window.Pusher.Runtime = {
        ...OriginalRuntime,
        getProtocol() {
          return "http:";
        },
      };

      const echo = new Echo({
        broadcaster: "reverb",
        key: import.meta.env.VITE_REVERB_APP_KEY,
        wsHost: import.meta.env.VITE_REVERB_HOST,
        wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
        wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
        forceTLS: false,
        encrypted: false,
        enabledTransports: ["ws"],
        transport: "ws",

        authEndpoint: import.meta.env.VITE_API_URL_image + "/broadcasting/auth",

        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      });

      // real time for inbox
      echo?.private(`replies.group`)?.notification((reply) => {
        if (reply.user_id === user?.id) {
          dispatch(fetchReplies());
          audio?.play();
          ToastSuccess(
            <div>
              <p style={{ paddingBottom: "5px" }}>{reply?.reply}</p>
              <p style={{ color: "#666", fontSize: "15px" }}>
                {reply?.full_name}
              </p>
            </div>,
            "bottom-right"
          );
        }
      });

      return () => {
        echo?.leave(`replies.group`);
      };
    }
  }, [user, token, dispatch]);

  // notifications real time
  useEffect(() => {
    const audio = new Audio(sound);

    if (token) {
      window.Pusher = Pusher;

      const OriginalRuntime = window.Pusher.Runtime;
      window.Pusher.Runtime = {
        ...OriginalRuntime,
        getProtocol() {
          return "http:";
        },
      };

      const echo = new Echo({
        broadcaster: "reverb",
        key: import.meta.env.VITE_REVERB_APP_KEY,
        wsHost: import.meta.env.VITE_REVERB_HOST,
        wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
        wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
        forceTLS: false,
        encrypted: false,
        enabledTransports: ["ws"],
        transport: "ws",

        authEndpoint: import.meta.env.VITE_API_URL_image + "/broadcasting/auth",

        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      });

      // real time for notification
      echo?.private(`notifications.group`)?.notification((notification) => {
        if (notification.user_id !== user?.id) {
          dispatch(fetchNotifications());
          audio?.play();
          ToastSuccess(
            <div>
              <p style={{ paddingBottom: "5px" }}>
                {notification?.full_name} {notification?.action}
              </p>
            </div>,
            "bottom-right"
          );
        }
      });

      return () => {
        echo?.leave(`notifications.group`);
      };
    }
  }, [user, token, dispatch]);

  // clear the count in the inbox
  const handleClearCountInbox = () => {
    dispatch(fetchReplies({ read: true }))
      .unwrap()
      .then(() => {
        dispatch(fetchReplies());
      });
  };

  // clear the count in the notification
  const handleClearCountNotification = () => {
    dispatch(fetchNotifications({ read: true }))
      .unwrap()
      .then(() => {
        dispatch(fetchNotifications());
      });
  };

  const handleClick = (event) => {
    setProfiles(event.currentTarget);
  };

  const handleClose = () => {
    setProfiles(null);
  };

  const handleLogout = () => {
    dispatch(createLogOut())
      .unwrap()
      .then(() => {
        navigate("/login");
      });
  };

  return (
    <>
      <HeaderMobile
        handleClick={handleClick}
        handleClose={handleClose}
        handleOpenMenu={handleOpenMenu}
        profile={profiles}
        imgProfile={profile?.user?.user_image}
        Count_inbox={replies?.number_of_messages}
        Count_notification={notifications?.number_of_notifications}
        handleClearCountInbox={handleClearCountInbox}
        handleClearCountNotification={handleClearCountNotification}
      />

      <div className={styles.header}>
        <div className={styles.header_content}>
          <div className={styles.menu}>
            <Button onClick={handleOpenMenu}>
              <HiOutlineMenuAlt1 className={styles.icon} />
            </Button>
          </div>

          <div className={styles.profile}>
            <div className={styles.search}>
              <CiSearch className={styles.icon} />

              <Search />
            </div>
            <div className={styles.profile_info}>
              {/* Notifications */}
              {checkNotifications() && (
                <div style={{ position: "relative" }}>
                  <IconButton
                    sx={{ padding: "5px" }}
                    onClick={handleClearCountNotification}
                    onClickCapture={(e) => setNotification(e.currentTarget)}
                    aria-controls="notifications"
                  >
                    <IoNotifications className={styles.icon} />
                  </IconButton>
                  <CustomizedMenus
                    isOpen={notification}
                    handlerClose={() => setNotification(false)}
                    width={400}
                  >
                    <Notification closeMenu={() => setNotification(false)} />
                  </CustomizedMenus>
                  {notifications?.number_of_notifications > 0 && (
                    <div className={styles.counter}>
                      <span className={styles.counterText}>
                        {notifications?.number_of_notifications}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Inbox  */}
              {checkPermission({
                name: "announcements",
                children: ["view_announcement_replies"],
              }) && (
                <div style={{ position: "relative" }}>
                  <IconButton
                    sx={{ padding: "5px" }}
                    onClick={handleClearCountInbox}
                    onClickCapture={(e) => setInbox(e.currentTarget)}
                    aria-controls="inbox"
                  >
                    <FaMessage
                      className={styles.icon}
                      style={{ fontSize: "20px", margin: "0px 5px 0px 15px" }}
                    />
                  </IconButton>

                  <CustomizedMenus
                    isOpen={inbox}
                    handlerClose={() => setInbox(false)}
                    width={400}
                  >
                    <Inbox closeMenu={() => setInbox(false)} />
                  </CustomizedMenus>
                  {replies?.number_of_messages > 0 && (
                    <div
                      className={styles.counter}
                      style={{ top: "-5px", right: "2px" }}
                    >
                      <span className={styles.counterText}>
                        {replies?.number_of_messages}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Profile */}
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {profile?.user?.user_image ? (
                  <img
                    src={`${import.meta.env.VITE_API_URL_image}/storage/user/${profile.user.user_image}`}
                    alt="Avatar Img_1"
                    loading="lazy"
                  />
                ) : (
                  <img src={Avatar} alt="Avatar Img_2" loading="lazy" />
                )}
              </Button>
              <CustomizedMenus isOpen={profiles} handlerClose={handleClose}>
                {checkPermission({
                  name: "users",
                  children: ["view_self"],
                }) && (
                  <div>
                    <MenuItem
                      onClick={handleClose}
                      onClickCapture={() => navigate("/profile")}
                      sx={{ gap: 1, fontSize: "18px", color: "#666" }}
                    >
                      <CgProfile size={23} />
                      Profile
                    </MenuItem>

                    <Divider sx={{ my: 0.5 }} />
                  </div>
                )}
                <MenuItem
                  onClick={handleClose}
                  sx={{ gap: 1, fontSize: "18px", color: "#666" }}
                  onClickCapture={handleLogout}
                >
                  <MdOutlineLogout size={23} />
                  Logout
                </MenuItem>
              </CustomizedMenus>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  handleOpenMenu: propTypes.func.isRequired,
};

export default Header;