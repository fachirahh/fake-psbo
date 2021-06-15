import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikController from "./FormikController";
import FormikButton from "./FormikButton";
import theme from "styles/theme";
import AuthService from "services/auth.service";
import { useHistory } from "react-router-dom";

function FormikLogin(setAlertStatus, ...props) {
  const history = useHistory();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Wajib diisi"),
    password: Yup.string().required("Wajib diisi"),
  });

  const handeLogin = async (values, onSubmitProps) => {
    AuthService.login(values).then(
      () => {
        const user = AuthService.getCurrentUser();
        if (user != null) {
          const { token, role } = AuthService.getCurrentUser();
          if (token != null && role === 1) {
            history.push("/beranda");
          } else if (token != null && role === 0) {
            history.push("/admin/beranda");
          }
        }
      },
      (error) => {
        console.log("ini error", error);
        setAlertStatus({
          severity: "error",
          message: "Gagal login, gunakan username dan password dengan benar",
        });
      }
    );

    onSubmitProps.setSubmitting(false);
  };

  // .catch((error) => {
  //   console.log(error.response);
  //   setAlertStatus({
  //     severity: "error",
  //     message: "Gagal login, gunakan username dan password dengan benar",
  //   });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handeLogin}
      validateOnMount={true}
    >
      {(formikProps) => {
        return (
          <Form {...props}>
            <FormikController
              style={{ marginBottom: theme.spacing(3) }}
              variant="outlined"
              fullWidth={true}
              control="textfield"
              type="text"
              label="Username IPB"
              name="username"
              formikProps={formikProps}
            />
            <FormikController
              style={{ marginBottom: theme.spacing(3) }}
              variant="outlined"
              fullWidth={true}
              control="textfield"
              type="password"
              label="Kata sandi"
              name="password"
              formikProps={formikProps}
            />
            <FormikButton
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              fullWidth
              disabled={!formikProps.isValid}
              isSubmitting={formikProps.isSubmitting}
              isValid={formikProps.isValid}
            >
              Masuk
            </FormikButton>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormikLogin;
