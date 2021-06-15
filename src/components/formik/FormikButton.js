import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ spacing }) => ({
  button: {
    padding: "12px 40px",
  },
}));

const FormikButton = (props) => {
  const classes = useStyles();
  const { isSubmitting, isValid, children, ...rest } = props;
  return (
    <Box>
      <Button
        {...rest}
        disabled={isSubmitting || !isValid}
        className={classes.button}
      >
        <Typography variant="h4">
          {isSubmitting ? "Loading..." : children}
        </Typography>
      </Button>
    </Box>
  );
};

export default FormikButton;
