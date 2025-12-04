import Spinner from "../Spinner/Spinner";
import styles from "./Card.module.css";
import propTypes from "prop-types";

const Card = ({ Icon, total, title_name, bg_color, isLoading }) => {
  return (
    <div className={styles.Card}>
      <div className={styles.Card_content}>
        <div className={styles.title}>
          <div className={styles[bg_color]}>{Icon}</div>
          <h3>{title_name}</h3>
        </div>
        <div className={styles.info}>
          {isLoading && <Spinner color={"var(--text-black)"} />}
          <h3>{total}</h3>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  Icon: propTypes.element.isRequired,
  total: propTypes.number.isRequired,
  title_name: propTypes.string.isRequired,
  bg_color: propTypes.string.isRequired,
  isLoading: propTypes.bool,
};

export default Card;
