import PropTypes from "prop-types";
import { Children, cloneElement, isValidElement } from "react";

const IndexAction = ({ children, row, closeMenu }) => {
  return (
    <div key={row.id}>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return null;
        return cloneElement(child, { row, closeMenu });
      })}
    </div>
  );
};

IndexAction.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  row: PropTypes.object.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default IndexAction;
