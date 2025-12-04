import {
  FormControl,
  FormLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import propTypes from "prop-types";

const Input = ({
  id,
  label,
  Error,
  Icon,
  placeholder,
  type,
  required,
  defaultValue,
  value,
  onChange,
}) => {
  return (
    <FormControl sx={{ gap: "10px", width: "100%" }}>
      <FormLabel htmlFor={id} sx={{ color: "var(--text-input)" }}>
        {label}
      </FormLabel>
      <TextField
        id={id}
        name={id}
        type={type || "text"}
        fullWidth
        error={Error?.status}
        helperText={Error?.message}
        color={Error?.status ? "error" : "primary"}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">{Icon}</InputAdornment>
            ),
          },
        }}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        sx={{
          bgcolor: "var(--bg-input)",
        }}
      />
    </FormControl>
  );
};

Input.propTypes = {
  id: propTypes.string.isRequired,
  label: propTypes.string,
  Error: propTypes.shape({
    status: propTypes.bool,
    message: propTypes.string,
  }),
  Icon: propTypes.any,
  placeholder: propTypes.string,
  type: propTypes.string,
  required: propTypes.bool,
  defaultValue: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
};

export default Input;
