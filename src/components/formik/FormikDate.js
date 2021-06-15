import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const FormikDate = (props) => {
  const { formikProps, label, name, ...rest } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        // Notes : Props untuk Date Picker
        onClick={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        autoComplete={"off"}
        variant="dialog"
        format="dd MMM yyyy"
        id={name}
        KeyboardButtonProps={{ "aria-label": "change date" }}
        // Notes : Props untuk hubungan dengan formik
        label={label}
        value={formikProps.values[name]}
        onChange={(value) => formikProps.setFieldValue(name, value)}
        inputVariant="outlined"
        disabled={formikProps.isSubmitting}
        focused={!formikProps.isSubmitting && !formikProps.errors[name]}
        {...rest}
      />
    </MuiPickersUtilsProvider>
  );
};

export default FormikDate;
