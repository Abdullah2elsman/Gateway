import { Link } from "react-router-dom";
import styles from "./Title.module.css";
import propTypes from "prop-types";

const Title = ({ title }) => {
  return (
    <div className={styles.Title}>
      <div className={styles.Title_content}>
        <h3>{title}</h3>
        <Link to={`/${title.toLowerCase().replace(/\s/g, "")}`}>
          <button>{`Go to ${title}`}</button>
        </Link>
      </div>
    </div>
  );
};

Title.propTypes = {
  title: propTypes.string.isRequired,
};

export default Title;
