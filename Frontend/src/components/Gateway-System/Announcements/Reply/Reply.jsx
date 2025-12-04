import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import TextArea from "../../Inputs/TextArea";
import Spinner from "../../Spinner/Spinner";

const Reply = ({ onSubmit, isLoading }) => {
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
        id="reply"
        label="Reply to Announcement"
        placeholder="Reply to Announcement"
        // defaultValue={reply?.announce}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={() => ""}
        sx={{ margin: "20px 0 0px", gap: 1 }}
      >
        {isLoading && <Spinner />} Reply
      </Button>
    </Box>
  );
};

Reply.propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default Reply;
