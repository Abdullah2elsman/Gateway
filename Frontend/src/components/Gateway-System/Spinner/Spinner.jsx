import { RotatingLines } from "react-loader-spinner";
import PropTypes from "prop-types";

const Spinner = ({ color }) => {
  return (
    <RotatingLines
      visible={true}
      height="25"
      width="25"
      strokeWidth="5"
      strokeColor={color || "#fff"}
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

Spinner.propTypes = {
  color: PropTypes.string,
};

export default Spinner;
