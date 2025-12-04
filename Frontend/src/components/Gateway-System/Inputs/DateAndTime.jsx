import propTypes from "prop-types";
import { FormControl, FormLabel } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

const DateAndTime = ({ id, label, defaultValue, Error, setValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <FormControl sx={{ gap: "10px" }}>
          <FormLabel sx={{ color: "var(--text-input)" }}>{label}</FormLabel>
          <DateTimePicker
            name={id}
            defaultValue={dayjs(defaultValue) || null}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            views={["day", "hours", "minutes", "month"]}
            sx={{
              bgcolor: "var(--bg-input)",
            }}
          />
        </FormControl>
      </DemoContainer>
    </LocalizationProvider>
  );
};

DateAndTime.propTypes = {
  id: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  defaultValue: propTypes.string,
  Error: propTypes.object,
  setValue: propTypes.func,
};

export default DateAndTime;
