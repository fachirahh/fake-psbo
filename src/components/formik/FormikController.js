import React from "react";
import FormikAutocompleteId from "./FormikAutocompleteId";
import FormikDate from "./FormikDate";
import FormikTextField from "./FormikTextField";
import FormikTime from "./FormikTime";

const FormikController = (props) => {
  const { control, listData, ...rest } = props;

  switch (control) {
    case "textfield":
      return <FormikTextField {...rest} />;

    case "date":
      return <FormikDate {...rest} />;

    case "time":
      return <FormikTime {...rest} />;

    case "autocompleteId":
      return <FormikAutocompleteId listData={listData} {...rest} />;

    default:
      return null;
  }
};

export default FormikController;
