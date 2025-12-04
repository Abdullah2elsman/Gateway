import { IoChevronBackCircle } from "react-icons/io5";
import styles from "./PathName.module.css";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PathName = ({ path, back, style }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1, { replace: true });
  };

  return (
    <div className={styles.pathname} style={style}>
      {back && <IoChevronBackCircle onClick={goBack} className={styles.icon} />}
      <h1>{path}</h1>
    </div>
  );
};

PathName.propTypes = {
  path: propTypes.string.isRequired,
  back: propTypes.bool,
  style: propTypes.object,
};

export default PathName;
