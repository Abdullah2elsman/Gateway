import propTypes from "prop-types";
import { FormControl, FormLabel } from "@mui/material";
import PhoneInput from "react-phone-input-2";

const PhoneNumber = ({ id, label, Error, value, required, setCountry }) => {
  return (
    <FormControl sx={{ gap: "10px" }}>
      <FormLabel
        htmlFor={id}
        sx={{
          color: "var(--text-input)",
        }}
      >
        {label}
      </FormLabel>
      <PhoneInput
        name={id}
        country={required ? "eg" : ""}
        required
        containerStyle={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          background: "var(--bg-input)",
        }}
        inputStyle={{
          background: "var(--bg-input)",
          width: "100%",
          paddingTop: "27px",
          paddingBottom: "27px",
        }}
        buttonStyle={{
          background: "var(--bg-input)",
        }}
        inputProps={{
          name: id,
          id,
          inputMode: "numeric",
          required: required,
        }}
        isValid={() => {
          return Error?.status ? false : true;
        }}
        defaultErrorMessage={Error?.message}
        value={value}
        onChange={(value, country) =>
          setCountry ? setCountry(country.name) : ""
        }
      />
    </FormControl>
  );
};

PhoneNumber.propTypes = {
  id: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  Error: propTypes.object,
  value: propTypes.string,
  required: propTypes.bool,
  setCountry: propTypes.func,
};

export default PhoneNumber;
