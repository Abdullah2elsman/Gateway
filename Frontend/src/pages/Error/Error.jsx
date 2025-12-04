import styles from "@styles/Error.module.css";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  // Dark Mode
  useEffect(() => {
    document.body.classList.remove("dark");
  }, []);

  return (
    <div className={styles.Error}>
      <div className={styles.Error_Content}>
        <h1>Oops!</h1>
        <div className={styles.info}>
          <h2>404 - Page not found</h2>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
          <NavLink to="/">Go To HomePage</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Error;
