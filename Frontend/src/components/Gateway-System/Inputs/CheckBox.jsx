import PropTypes from "prop-types";
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";

const CheckBox = ({
  id,
  label,
  name,
  defaultChecked,
  handlePermissionChange,
}) => {
  return (
    <FormControl>
      <FormControlLabel
        label={label}
        sx={{
          width: "100%",
          justifyContent: "space-between",
          padding: "0px",
          margin: "0px",
          color: "var(--text-gray)",
        }}
        control={
          <Checkbox
            sx={{
              color: "var(--text-gray)",
            }}
            id={id || ""}
            name={name}
            onChange={handlePermissionChange}
            checked={defaultChecked || false}
            value={defaultChecked}
            size="medium"
          />
        }
      />
    </FormControl>
  );
};

CheckBox.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  defaultChecked: PropTypes.any,
  handlePermissionChange: PropTypes.func,
};

export default CheckBox;
