import { Box } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const BaseAlert = (props) => {
  const { status, ...rest } = props;
  const { severity, message } = status;
  if (!severity) return null;
  return (
    <Box>
      <Alert severity={severity}>{message}</Alert>
    </Box>
  );
};

export default BaseAlert;
