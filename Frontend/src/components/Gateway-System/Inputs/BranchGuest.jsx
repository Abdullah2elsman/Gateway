import {
  Autocomplete,
  FormControl,
  FormLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import { getBranchesGuest } from "@src/store/reducers/Branches/BrancheSlice";
import { useEffect } from "react";
import { IoIosGitBranch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const BranchGuest = ({ Error, defaultValue }) => {
  const dispatch = useDispatch();
  const { Guest } = useSelector((state) => state.branches);

  useEffect(() => {
    dispatch(getBranchesGuest());
  }, [dispatch]);

  return (
    <FormControl sx={{ gap: "10px" }}>
      <FormLabel
        htmlFor="branch"
        sx={{
          color: "var(--text-input)",
        }}
      >
        Branch
      </FormLabel>

      <Autocomplete
        disablePortal
        fullWidth
        options={
          Guest?.branches?.map((guest, index) => ({
            id: index,
            label: guest.branch,
          })) || []
        }
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option.label}
            </li>
          );
        }}
        id="branch"
        name="branch"
        defaultValue={defaultValue}
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
                    <IoIosGitBranch size={25} />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
        sx={{
          bgcolor: "var(--bg-input)",
        }}
      />
    </FormControl>
  );
};

BranchGuest.propTypes = {
  Error: PropTypes.object,
  defaultValue: PropTypes.string,
};

export default BranchGuest;
