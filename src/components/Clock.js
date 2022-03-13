import { format } from "date-fns";
import { Typography } from "@mui/material";

const Clock = ({ time }) => {
  const date = new Date(time);

  return (
    <>
      <Typography>
        {format(date, "yyyy-MM-dd")}
      </Typography>
      <Typography component="p" variant="h4">
        {format(date, "HH:mm:ss")}
      </Typography>
    </>
  );
};

export default Clock;
