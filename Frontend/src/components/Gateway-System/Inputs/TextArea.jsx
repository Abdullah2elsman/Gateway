import { FormControl, FormLabel, TextareaAutosize } from "@mui/material";
import propTypes from "prop-types";

const TextArea = ({ id, label, placeholder, defaultValue }) => {
  return (
    <FormControl sx={{ gap: "10px" }}>
      <FormLabel htmlFor={id} sx={{ color: "var(--text-input)" }}>
        {label}
      </FormLabel>
      <TextareaAutosize
        name={id}
        id={id}
        aria-label="empty textarea"
        placeholder={placeholder}
        minRows={4}
        maxRows={10}
        style={{
          padding: "10px",
          resize: "none",
          borderRadius: "5px",
          background: "var(--bg-input)",
        }}
        defaultValue={defaultValue || ""}
      />
    </FormControl>
  );
};

TextArea.propTypes = {
  id: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  placeholder: propTypes.string,
  defaultValue: propTypes.string,
};

export default TextArea;
