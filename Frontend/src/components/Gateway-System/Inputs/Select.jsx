import {
  Autocomplete,
  Box,
  FormControl,
  FormLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import propTypes from "prop-types";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";

const Select = ({
  id,
  name,
  label,
  options,
  defaultValue,
  value,
  Error,
  Icon,
  placeholder,
  Button,
  required,
  onChange,
  onSubmitNew,
  onDelete,
  loading,
  AllowClear,
  showRemoveButton,
}) => {
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);
  const [newOption, setNewOption] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const handlerNewAdd = () => {
    if (newOption) {
      onSubmitNew(newOption);
    }
    setNewOption("");
  };

  const handlerDelete = (optionToDelete) => {
    if (optionToDelete && onDelete) {
      onDelete(optionToDelete.id);
    }
  };

  return (
    <FormControl sx={{ gap: "10px", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <FormLabel htmlFor={id} sx={{ color: "var(--text-input)" }}>
          {label}
        </FormLabel>
        {Button && (
          <button
            type="button"
            style={{
              background: "var(--bg-button)",
              padding: "8px 20px",
              color: "var(--text-white)",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              setAdd(!add);
              setRemove(false);
            }}
          >
            {!add ? "Add" : "Cancel"}
          </button>
        )}
        {showRemoveButton && !add && (
          <button
            type="button"
            style={{
              background: "#dc3545",
              padding: "8px 20px",
              color: "var(--text-white)",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginLeft: 8,
            }}
            onClick={() => setRemove(!remove)}
          >
            {!remove ? "Remove" : "Cancel"}
          </button>
        )}
        {AllowClear && !add && (
          <button
            type="button"
            style={{
              background: "var(--bg-button)",
              padding: "8px 20px",
              color: "var(--text-white)",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginLeft: 8,
            }}
            onClick={() => {
              // Inform parent to clear selection
              onChange && onChange(null, null);
              // Reset Autocomplete internal state
              setResetKey((k) => k + 1);
            }}
          >
            Clear
          </button>
        )}
      </Box>

      {add ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            name={`new${name || id}`}
            fullWidth
            placeholder={`Add new  ${name || id}`}
            sx={{
              bgcolor: "var(--bg-input)",
            }}
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
          />
          <button
            type="button"
            style={{
              background: "var(--bg-button)",
              padding: "8px 10px",
              color: "var(--text-white)",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handlerNewAdd}
          >
            {loading ? <Spinner /> : "Save"}
          </button>
        </Box>
      ) : remove ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <p style={{ margin: 0, color: "var(--text-input)" }}>
            Select a {label.toLowerCase()} to remove:
          </p>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                style={{
                  background: "#dc3545",
                  padding: "8px 12px",
                  color: "var(--text-white)",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                onClick={() => handlerDelete(option)}
              >
                {loading ? <Spinner /> : `${option.label}`}
              </button>
            ))}
          </Box>
        </Box>
      ) : (
        <Autocomplete
          key={resetKey}
          disablePortal
          fullWidth
          renderOption={(props, option, { index }) => (
            <li {...props} key={index} data-value={option.id}>
              {option.label}
            </li>
          )}
          options={options}
          id={id}
          name={name || id}
          defaultValue={defaultValue || ""}
          value={value}
          onChange={onChange}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              required={required}
              placeholder={placeholder}
              name={id}
              error={Error?.status}
              helperText={Error?.message}
              InputProps={{
                ...params.InputProps,

                startAdornment: (
                  <>
                    <InputAdornment position="start">{Icon}</InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
              sx={{
                bgcolor: "var(--bg-input)",
              }}
            />
          )}
        />
      )}
    </FormControl>
  );
};

Select.propTypes = {
  id: propTypes.string.isRequired,
  name: propTypes.string,
  label: propTypes.string.isRequired,
  options: propTypes.any,
  defaultValue: propTypes.string,
  value: propTypes.string,
  Error: propTypes.object,
  Icon: propTypes.object,
  placeholder: propTypes.string,
  Button: propTypes.bool,
  required: propTypes.bool,
  onChange: propTypes.func,
  onSubmitNew: propTypes.func,
  onDelete: propTypes.func,
  loading: propTypes.bool,
  AllowClear: propTypes.bool,
  showRemoveButton: propTypes.bool,
};

export default Select;
