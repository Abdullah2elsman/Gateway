import styles from "./Sidebar.module.css";
import propTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Logo from "@assets/image/Logo.png";
import Switch from "@mui/material/Switch";
import {
  MdDashboard,
  MdDarkMode,
  MdBatchPrediction,
  MdGroups2,
} from "react-icons/md";
import { GiSandsOfTime } from "react-icons/gi";
import { TfiTimer } from "react-icons/tfi";
import { TbCreditCardRefund } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUsers, FaPauseCircle, FaHistory } from "react-icons/fa";
import { PiClockUserFill } from "react-icons/pi";
import { GoBlocked } from "react-icons/go";
import { FaLayerGroup } from "react-icons/fa6";
import checkPermission from "@src/util/CheckPermission";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSettings } from "@src/store/reducers/Settings/SettingsSlice";

const Sidebar = ({ darkmode, handleDarkMode, isOpenMenu, isCloseMenu }) => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  return (
    <>
      <div className={[`${styles.Sidebar} ${isOpenMenu ? styles.open : ""}`]}>
        <div className={styles.overlay} onClick={isCloseMenu}></div>
        <div className={styles.Sidebar_content}>
          <div className={styles.Sidebar_title}>
            {settings?.site_logo ? (
              <img
                src={`${import.meta.env.VITE_API_URL_image}${
                  settings?.site_logo
                }`}
                alt="Logo"
                loading="lazy"
              />
            ) : (
              <img src={Logo} alt="Logo" loading="lazy" />
            )}
          </div>
          <div className={styles.Sidebar_menu}>
            <ul>
              <div className={styles.element_menu}>
                <span>Dashboard</span>
                <NavLink
                  to={"/"}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  <MdDashboard className={styles.icon} />
                  <li>Dashboard</li>
                </NavLink>

                {checkPermission({
                  name: "batches",
                  children: [
                    "view_batches",
                    "view_own_batches",
                    "view_batches_by_branch",
                  ],
                }) && (
                  <NavLink
                    to={"/batches"}
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <MdBatchPrediction className={styles.icon} />
                    <li>Batches</li>
                  </NavLink>
                )}

                {checkPermission({
                  name: "waitlist",
                  children: [
                    "view_trainees",
                    "view_own_trainees",
                    "view_trainees_by_branch",
                  ],
                }) && (
                  <NavLink
                    to={"/waitlist"}
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <TfiTimer className={styles.icon} />
                    <li>Wait List</li>
                  </NavLink>
                )}

                {checkPermission({
                  name: "pendinglist",
                  children: [
                    "view_trainees",
                    "view_own_trainees",
                    "view_trainees_by_branch",
                  ],
                }) && (
                  <NavLink
                    to={"/pendingtest"}
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <GiSandsOfTime className={styles.icon} />
                    <li>Pending Test List</li>
                  </NavLink>
                )}
                {checkPermission({
                  name: "trainees",
                  children: ["view_trainees", "view_trainees_by_branch"],
                }) && (
                  <NavLink
                    to={"/trainess"}
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <MdGroups2 className={styles.icon} />
                    <li>Trainess</li>
                  </NavLink>
                )}
                
                {/* Branch Logs Link */}
                 <NavLink
                    to={"/logs/branch"}
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <FaHistory className={styles.icon} />
                    <li>Branch Logs</li>
                  </NavLink>

                {!checkPermission({
                  name: "attendance",
                  children: ["view_attendance"],
                }) &&
                  checkPermission({
                    name: "attendance",
                    children: ["view_trainer_attendance"],
                  }) && (
                    <NavLink
                      to={"/trainer-attendance"}
                      className={({ isActive }) =>
                        isActive ? styles.active : ""
                      }
                    >
                      <FaLayerGroup className={styles.icon} />
                      <li>Attendance</li>
                    </NavLink>
                  )}
              </div>

              <div className={styles.element_menu}>
                {(checkPermission({
                  name: "holdlist",
                  children: [
                    "view_trainees",
                    "view_own_trainees",
                    "view_trainees_by_branch",
                  ],
                }) ||
                  checkPermission({
                    name: "refundlist",
                    children: [
                      "view_trainees",
                      "view_own_trainees",
                      "view_trainees_by_branch",
                    ],
                  }) ||
                  checkPermission({
                    name: "blacklist",
                    children: [
                      "view_trainees",
                      "view_own_trainees",
                      "view_trainees_by_branch",
                    ],
                  })) && <span>Hold</span>}

                {checkPermission({
                  name: "holdlist",
                  children: [
                    "view_trainees",
                    "view_own_trainees",
                    "view_trainees_by_branch",
                  ],
                }) && (
                  <NavLink
                    to={"/holdlist"}
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <FaPauseCircle className={styles.icon} />
                    <li>Hold List</li>
                  </NavLink>
                )}

                {checkPermission({
                  name: "refundlist",
                  children: [
                    "view_trainees",
                    "view_own_trainees",
                    "view_trainees_by_branch",
                  ],
                }) && (
                  <NavLink
                    to={"/refunded"}
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <TbCreditCardRefund className={styles.icon} />
                    <li>Refund</li>
                  </NavLink>
                )}

                {checkPermission({
                  name: "blacklist",
                  children: [
                    "view_trainees",
                    "view_own_trainees",
                    "view_trainees_by_branch",
                  ],
                }) && (
                  <NavLink
                    to={"/blacklist"}
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <GoBlocked className={styles.icon} />
                    <li>Blacklist</li>
                  </NavLink>
                )}
              </div>

              <div className={styles.element_menu}>
                {(checkPermission({
                  name: "users",
                  children: [
                    "view_users_by_branch",
                    "view_own_users",
                    "view_users",
                  ],
                }) ||
                  checkPermission({
                    name: "pendingusers",
                    children: [
                      "view_pending_users",
                      "view_pending_users_by_branch",
                    ],
                  })) && <span>Users</span>}

                {checkPermission({
                  name: "users",
                  children: [
                    "view_users_by_branch",
                    "view_own_users",
                    "view_users",
                  ],
                }) && (
                  <NavLink
                    to={"/users"}
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <FaUsers className={styles.icon} />
                    <li>Users</li>
                  </NavLink>
                )}
                {checkPermission({
                  name: "pendingusers",
                  children: [
                    "view_pending_users",
                    "view_pending_users_by_branch",
                  ],
                }) && (
                  <NavLink
                    to={"/pendingusers"}
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <PiClockUserFill className={styles.icon} />
                    <li>Pending Users</li>
                  </NavLink>
                )}
              </div>

              <div className={styles.element_menu}>
                <span>Other</span>
                {checkPermission({
                  name: "settings",
                  children: ["view_settings"],
                }) && (
                  <NavLink
                    to={"/setting"}
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <IoSettingsOutline className={styles.icon} />
                    <li>Settings</li>
                  </NavLink>
                )}

                <div className={styles.darkMode}>
                  <div className={styles.dark_title}>
                    <MdDarkMode className={styles.icon} />
                    <h3>Dark Mode</h3>
                  </div>
                  <Switch
                    aria-controls="switch dark"
                    name="switch dark"
                    value={darkmode === "true" ? true : false}
                    checked={darkmode === "true" ? true : false}
                    onChange={handleDarkMode}
                    size="medium"
                    className={styles.Switch}
                  />
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  handleDarkMode: propTypes.func.isRequired,
  isOpenMenu: propTypes.bool.isRequired,
  isCloseMenu: propTypes.func.isRequired,
  darkmode: propTypes.any.isRequired,
};

export default Sidebar;
