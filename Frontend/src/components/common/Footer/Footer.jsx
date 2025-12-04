import styles from "./Footer.module.css";
import PropTypes from "prop-types";

const Footer = ({ site_title }) => {
  return (
    <footer className={styles.footer}>
      <h3>&copy; {site_title}.com</h3>
    </footer>
  );
};

Footer.propTypes = {
  site_title: PropTypes.string,
};

export default Footer;
