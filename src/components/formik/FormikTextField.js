import React from "react";
import { Field } from "formik";
import { TextField } from "@material-ui/core";

const MaterialTextField = (props) => {
  const { form, field, extendError, ...rest } = props;
  // Notes : Operasi khusus untuk Array of Input
  const [arrayName, arrayInputIndex, inputLabel] = field.name.split(".");
  const arrayInputTextError =
    form.errors[arrayName]?.[arrayInputIndex]?.[inputLabel] ?? false;
  return (
    <TextField
      {...field}
      {...rest}
      // Notes : TextField akan focus jika !disubmit, !touched, dan nilainya !undefined
      focused={
        !form.isSubmitting &&
        !form.errors[field.name] &&
        form.touched[field.name]
      }
      // Notes : TextField akan error jika nilainya undefined dan touched
      // error={!!form.errors[field.name] && form.touched[field.name]}
      // helperText={form.errors[field.name] && form.touched[field.name] ? form.errors[field.name] : null}

      // Notes : Error untuk handle value array (masih dalam tahap perkembangan)
      error={
        arrayInputTextError && extendError
          ? true
          : !!form.errors[field.name] && form.touched[field.name]
      }
      helperText={
        arrayInputTextError && extendError
          ? arrayInputTextError
          : form.errors[field.name] && form.touched[field.name]
          ? form.errors[field.name]
          : null
      }
    />
  );
};

const FormikTextField = (props) => {
  const { formikProps, disabledField, ...rest } = props;
  return (
    <div>
      <Field
        disabled={formikProps.isSubmitting}
        component={MaterialTextField}
        {...rest}
      />
    </div>
  );
};

export default FormikTextField;
