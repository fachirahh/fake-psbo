import { Box, CircularProgress } from "@material-ui/core";

const DataProgress = (props) => {
  return (
    <Box my={12} display="flex" justifyContent="center" {...props}>
      <CircularProgress />
    </Box>
  );
};

export default DataProgress;
