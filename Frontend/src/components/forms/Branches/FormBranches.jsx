import { Box, Button } from "@mui/material";
import Input from "@src/components/Gateway-System/Inputs/Input";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import PropTypes from "prop-types";

const FormBranches = ({ onSubmit, edit, isLoading, data }) => {
  return (
    <div style={{ padding: "50px auto" }}>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
          margin: "20px 0 0",
          overflow: "auto",
        }}
      >
        <Input
          id="country"
          label="Country"
          placeholder="country"
          defaultValue={data?.country}
        />
        <Input
          id="city"
          label="City"
          placeholder="city"
          defaultValue={data?.city}
        />
        <Input
          id="district"
          label="District"
          placeholder="district"
          defaultValue={data?.district}
        />
        <Button type="submit" variant="contained">
          {isLoading && <Spinner />} {edit ? "Edit" : "Add"} Branch
        </Button>
      </Box>
    </div>
  );
};

FormBranches.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  isLoading: PropTypes.bool,
  data: PropTypes.object,
};

export default FormBranches;
