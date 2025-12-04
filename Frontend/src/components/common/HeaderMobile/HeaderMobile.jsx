import { useState } from "react";
import styles from "./HeaderMobile.module.css";
import propTypes from "prop-types";

import Avatar from "@assets/image/Avatar.png";
import { Button, Divider, IconButton, MenuItem } from "@mui/material";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoNotifications } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import CustomizedMenus from "@components/Gateway-System/CustomizedMenus/CustomizedMenus";
import Notification from "@components/Gateway-System/Notification/Notification";
import Inbox from "@components/Gateway-System/Inbox/Inbox";
import checkPermission from "@src/util/CheckPermission";
import Search from "@src/components/Gateway-System/Search/Search";

const HeaderMobile = ({
  handleClick,
  handleClose,
  handleOpenMenu,
  profile,
  imgProfile,
  token,
  Count_inbox,
  Count_notification,
  handleClearCountInbox,
  handleClearCountNotification,
}) => {
  const [show_search, setShowSearch] = useState(false);
  const [notification, setNotification] = useState(null);
  const [inbox, setInbox] = useState(null);

  return (
    <div className={styles.headerMobile}>
      <div className={styles.headerMobile_content}>
        <div className={styles.menu}>
          <IconButton onClick={handleOpenMenu}>
            <HiOutlineMenuAlt1 className={styles.icon} />
          </IconButton>
        </div>
        <div className={styles.profile}>
          {/* Search */}
          <IconButton onClick={() => setShowSearch(!show_search)}>
            <CiSearch className={styles.icon} size={25} />
          </IconButton>

          <div
            className={[`${styles.search} ${show_search ? styles.show : ""}`]}
          >
            <CiSearch className={styles.icon} />
            <Search />
          </div>
          {/* End Search */}

          <div className={styles.profile_info}>
            {/* Notification*/}
            <div style={{ position: "relative" }}>
              <IconButton
                onClick={handleClearCountNotification}
                onClickCapture={(e) => setNotification(e.currentTarget)}
                aria-controls="notifications"
              >
                <IoNotifications className={styles.icon} size={20} />
              </IconButton>

              <CustomizedMenus
                isOpen={notification}
                handlerClose={() => setNotification(false)}
                width={"90% !important"}
              >
                <Notification closeMenu={() => setNotification(false)} />
              </CustomizedMenus>
              {Count_notification > 0 && (
                <div className={styles.counter}>
                  <span className={styles.counterText}>
                    {Count_notification}
                  </span>
                </div>
              )}
            </div>

            {/* inbox */}
            {checkPermission({
              name: "announcements",
              children: ["view_announcement_replies"],
            }) && (
              <div style={{ position: "relative" }}>
                <IconButton
                  onClick={handleClearCountInbox}
                  onClickCapture={(e) => setInbox(e.currentTarget)}
                  aria-controls="inbox"
                >
                  <FaMessage className={styles.icon} />
                </IconButton>

                <CustomizedMenus
                  isOpen={inbox}
                  handlerClose={() => setInbox(false)}
                  width={"90% !important"}
                >
                  <Inbox closeMenu={() => setInbox(false)} />
                </CustomizedMenus>

                {Count_inbox > 0 && (
                  <div
                    className={styles.counter}
                    style={{ top: "-5px", right: "2px" }}
                  >
                    <span className={styles.counterText}>{Count_inbox}</span>
                  </div>
                )}
              </div>
            )}

            {/* Menu Profile */}
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {imgProfile ? (
                <img
                  src={`${import.meta.env.VITE_API_URL_image}${
                    imgProfile || ""
                  }/${token}`}
                  alt="Avatar Img_1"
                />
              ) : (
                <img src={Avatar} alt="Avatar Img_2" />
              )}
            </Button>
            <CustomizedMenus isOpen={profile} handlerClose={handleClose}>
              {checkPermission({
                name: "users",
                children: ["view_self"],
              }) && (
                <div>
                  <MenuItem
                    onClick={handleClose}
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
              >
                <MdOutlineLogout size={23} />
                Logout
              </MenuItem>
            </CustomizedMenus>
          </div>
        </div>
      </div>
    </div>
  );
};

HeaderMobile.propTypes = {
  profile: propTypes.object,
  handleClick: propTypes.func.isRequired,
  handleClose: propTypes.func.isRequired,
  handleOpenMenu: propTypes.func.isRequired,
  imgProfile: propTypes.string,
  token: propTypes.string,
  Count_inbox: propTypes.number,
  Count_notification: propTypes.number,
  handleClearCountInbox: propTypes.func,
  handleClearCountNotification: propTypes.func,
};

export default HeaderMobile;
