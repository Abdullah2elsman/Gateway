import propTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import { MdOutlineEmail } from "react-icons/md";
import { useEffect, useState } from "react";

const Email = ({ Error, setError, defaultValue, value }) => {
  const [emailValue, setEmailValue] = useState("");

  useEffect(() => {
    if (value || value?.includes("@gatewaycommunity.net")) {
      let splitEmail = value?.split("@gatewaycommunity.net");
      setEmailValue(splitEmail[0]);
    }
  }, [value]);

  return (
    <FormControl sx={{ gap: "10px" }}>
      <FormLabel
        htmlFor="email"
        sx={{
          color: "var(--text-input)",
        }}
      >
        Email
      </FormLabel>
      <TextField
        required
        fullWidth
        id="email"
        name="email"
        autoComplete="email"
        variant="outlined"
        error={Error?.status}
        helperText={Error?.message}
        color={Error?.status ? "error" : "primary"}
        defaultValue={defaultValue}
        value={emailValue}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <MdOutlineEmail size={25} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <span>@gatewaycommunity.net</span>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          bgcolor: "var(--bg-input)",
          "@media (max-width: 767px)": {
            "& span": {
              fontSize: "14px !important",
            },
          },
        }}
        onChange={(e) => {
          setEmailValue(e.target.value);
          e.target.value.includes("@")
            ? setError({
                status: true,
                message: "You should not write @example.com",
              })
            : (e.target.value,
              setError({
                status: false,
                message: "",
              }));
        }}
      />
    </FormControl>
  );
};

Email.propTypes = {
  Error: propTypes.shape({
    status: propTypes.bool.isRequired,
    message: propTypes.string.isRequired,
  }),
  defaultValue: propTypes.string,
  value: propTypes.string,
  setValue: propTypes.func,
  setError: propTypes.func,
};

export default Email;
