import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useState } from "react";

function FormikTime(props) {
  const { formikProps, label, name, ...rest } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        // Notes : Props untuk Date Picker
        onClick={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        autoComplete={"off"}
        variant="dialog"
        id={name}
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
}

export default FormikTime;
