import {
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  MdLockOutline,
  MdOutlineVisibilityOff,
  MdVisibility,
} from "react-icons/md";
import propTypes from "prop-types";

const Password = ({
  Error,
  label,
  id,
  value,
  setValue,
  showType,
  setShowType,
  required,
}) => {
  return (
    <>
      <FormLabel
        htmlFor={id}
        sx={{
          color: "var(--text-input)",
        }}
      >
        {label}
      </FormLabel>
      <TextField
        required={required}
        fullWidth
        name={id}
        placeholder="••••••"
        type={showType ? "text" : "password"}
        id={id}
        autoComplete="new-password"
        variant="outlined"
        value={value}
        onChange={(e) => setValue && setValue(e.target.value)}
        error={Error?.status}
        helperText={Error?.message}
        color={Error?.status ? "error" : "primary"}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <MdLockOutline size={25} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowType(!showType)}
                  edge="end"
                >
                  {showType ? (
                    <MdVisibility size={25} />
                  ) : (
                    <MdOutlineVisibilityOff size={25} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          bgcolor: "var(--bg-input)",
        }}
      />
    </>
  );
};

Password.propTypes = {
  Error: propTypes.any,
  label: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  value: propTypes.string,
  setValue: propTypes.func,
  showType: propTypes.bool,
  setShowType: propTypes.func,
  required: propTypes.bool,
};

export default Password;
