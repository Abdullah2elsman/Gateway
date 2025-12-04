import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import TextArea from "../../Inputs/TextArea";
import Spinner from "../../Spinner/Spinner";

const Add = ({ onSubmit, isLoading, announce, edit }) => {
  return (
    <Box
      component={"form"}
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingTop: "20px",
      }}
    >
      <TextArea
        id="announce"
        label="Announce"
        defaultValue={announce?.announce}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={() => ""}
        sx={{ margin: "20px 0 0px", gap: 1 }}
      >
        {isLoading && <Spinner />} {edit ? "Edit" : "Add"} Announcement
      </Button>
    </Box>
  );
};

Add.propTypes = {
  isLoading: PropTypes.bool,
  announce: PropTypes.object,
  edit: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default Add;
