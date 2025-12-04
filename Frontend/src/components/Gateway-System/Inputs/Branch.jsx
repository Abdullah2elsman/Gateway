import propTypes from "prop-types";
import {
  Autocomplete,
  FormControl,
  FormLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import { IoIosGitBranch } from "react-icons/io";

const Branch = ({
  id,
  label,
  Error,
  defaultValue,
  value,
  branches,
  current_branch,
  setBranch,
  display,
  background,
}) => {
  let Options =
    branches?.length &&
    branches?.map((branch, index) => {
      return { id: index, label: branch?.branch };
    });

  return (
    <FormControl sx={{ gap: "10px", width: "100%", display: display }}>
      <FormLabel
        htmlFor={id || "branch"}
        sx={{
          color: "var(--text-input)",
        }}
      >
        {label ? "" : "Branch"}
      </FormLabel>

      <Autocomplete
        disablePortal
        fullWidth
        options={Options || []}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option.label}
            </li>
          );
        }}
        id={id || "branch"}
        name="branch"
        defaultValue={defaultValue || current_branch || ""}
        value={value}
        filterSelectedOptions={true}
        onChange={(e, v) => setBranch && setBranch(v?.label)}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            placeholder="Choose a branch"
            name="branch"
            error={Error?.status}
            helperText={Error?.message}
            InputProps={{
              ...params.InputProps,

              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <IoIosGitBranch size={25} color="var(--text-gray)" />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
        sx={{
          bgcolor: background || "var(--bg-input)",

          "& .css-bql6zh-MuiInputBase-root-MuiOutlinedInput-root": {
            color: background && "var(--text-gray) !important",
          },
        }}
      />
    </FormControl>
  );
};

Branch.propTypes = {
  Error: propTypes.object,
  defaultValue: propTypes.string,
  value: propTypes.string,
  branches: propTypes.array,
  current_branch: propTypes.string,
  id: propTypes.string,
  label: propTypes.any,
  setBranch: propTypes.func,
  display: propTypes.string,
  background: propTypes.string,
};

export default Branch;
