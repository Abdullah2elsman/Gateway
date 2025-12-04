import propTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import { FullNameValidator } from "@src/validation/FullName";
import { FaRegUser } from "react-icons/fa6";

const FullName = ({ id, label, Error, value, setValue, icon }) => {
  return (
    <FormControl sx={{ gap: "10px", width: "100%" }}>
      <FormLabel
        htmlFor={id || "full_name"}
        sx={{
          color: "var(--text-input)",
        }}
      >
        {label || "Full Name"}
      </FormLabel>
      <TextField
        autoComplete={id || "full_name"}
        name={id || "full_name"}
        required
        fullWidth
        id={id || "full_name"}
        placeholder={label || "Full Name"}
        error={Error?.status}
        helperText={Error?.message}
        color={Error?.status ? "error" : "primary"}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                {icon || <FaRegUser size={20} />}
              </InputAdornment>
            ),
          },
        }}
        value={value}
        onChange={(e) => {
          FullNameValidator(e.target.value, setValue);
        }}
        sx={{
          bgcolor: "var(--bg-input)",
        }}
      />
    </FormControl>
  );
};

FullName.propTypes = {
  id: propTypes.string,
  label: propTypes.string,
  Error: propTypes.shape({
    status: propTypes.bool.isRequired,
    message: propTypes.string.isRequired,
  }),
  value: propTypes.string,
  setValue: propTypes.func,
  icon: propTypes.node,
};

export default FullName;
