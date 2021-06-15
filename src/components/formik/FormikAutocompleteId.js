import React from "react";
import FormikTextField from "./FormikTextField";
import { Autocomplete } from "@material-ui/lab";

const FormikAutocompleteId = (props) => {
  const { formikProps, listData, name, ...rest } = props;
  console.log("ini listdata", listData);
  console.log("ini name", name);
  return (
    <Autocomplete
      options={listData}
      getOptionLabel={(option) => option.name}
      getOptionSelected={(option) => option._id}
      defaultValue={{ name: formikProps.initialValues[name] }}
      onChange={(event, values) => {
        formikProps.setFieldValue(name, values?._id ?? "");
      }}
      renderInput={(params) => (
        <FormikTextField
          {...params}
          {...rest}
          name={name}
          formikProps={formikProps}
        />
      )}
    />
  );
};

export default FormikAutocompleteId;
