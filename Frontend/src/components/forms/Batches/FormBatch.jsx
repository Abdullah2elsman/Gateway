import PropTypes from "prop-types";
import { Box, Button, FormControl, FormLabel, Switch } from "@mui/material";
import Input from "@src/components/Gateway-System/Inputs/Input";
import { MdDateRange } from "react-icons/md";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import Branch from "@src/components/Gateway-System/Inputs/Branch";
import { useSelector } from "react-redux";
import checkPermission from "@src/util/CheckPermission";

const AddBatch = ({ onSubmit, edit, isLoading, batch }) => {
  const { page_branches } = useSelector((state) => state.branches);

  //  Handler Submited
  const handlerSumbit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    let batchs = {
      batch_title: data.batch_title,
      start_date: data.start_date,
      end_date: data.end_date,
      branch: data?.branch,
      status: data.status === "on" ? true : false,
    };

    if (edit) {
      batchs.id = batch?.id;
    }

    onSubmit(batchs);
  };
  

  return (
    <div>
      <Box
        component={"form"}
        onSubmit={handlerSumbit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
          margin: "20px 0 0",
        }}
      >
        {checkPermission({
          name: "batches",
          children: ["create_batches", "update_batches", "update_own_batches"],
        }) && (
          <>
            {page_branches?.current_branch && (
              <Branch
                defaultValue={batch?.branch}
                branches={page_branches.branches}
                current_branch={page_branches.current_branch}
              />
            )}
          </>
        )}

        <Input
          id="batch_title"
          label="Title Batch"
          placeholder="Title Batch"
          defaultValue={batch?.batch_title}
        />
        <Input
          id="start_date"
          label="Start Date"
          placeholder="Start Date"
          type="date"
          Icon={<MdDateRange size={25} />}
          defaultValue={batch?.start_date}
        />
        <Input
          id="end_date"
          label="End Date"
          placeholder="End Date"
          type="date"
          Icon={<MdDateRange size={25} />}
          defaultValue={batch?.end_date}
        />

        <FormControl
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <FormLabel htmlFor="status" sx={{ color: "var(--text-gray)" }}>
            Stauts
          </FormLabel>
          <Switch id="status" name="status" defaultChecked={batch?.status} />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={() => ""}
          sx={{ margin: "20px 0 0px" }}
        >
          {isLoading && <Spinner />} {edit ? "Edit" : "Add"} Batch
        </Button>
      </Box>
    </div>
  );
};

AddBatch.propTypes = {
  onSubmit: PropTypes.func,
  edit: PropTypes.bool,
  isLoading: PropTypes.bool,
  batch: PropTypes.any,
};

export default AddBatch;
