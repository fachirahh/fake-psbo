import {
  Box,
  makeStyles,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@material-ui/core";
import "date-fns";

import TemplateNavigation from "components/layouts/TemplateNavigation";
import React, { useEffect, useState } from "react";
import FormikOrderForm from "components/formik/FormikOrderForm";
import BaseAlert from "components/lab/BaseAlert";
import authService from "services/auth.service";
import { useHistory } from "react-router";
import userService from "services/user.service";
import DataProgress from "components/loading/DataProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: "380px",
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: `${theme.spacing(2)}px 0  ${theme.spacing(2)}px 0`,
  },
  card: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.optional.contrastText,
  },
}));

function OrderForm({ match }) {
  const classes = useStyles();
  const currentUser = authService.getCurrentUser();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const [alertStatus, setAlertStatus] = useState({
    severity: "info",
    message: "Isi form untuk pesan ruangan",
  });

  useEffect(() => {
    fetchRoom();
  }, []);

  const [dataRoom, setDataRoom] = useState({});
  console.log("ini dataroom", dataRoom);

  const fetchRoom = () => {
    const id = match.params.id;
    userService.getRoomById(id).then(
      (response) => {
        setDataRoom(response.data);
        setIsLoading(false);
      },
      (error) => {
        const _data =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setDataRoom(_data);
      }
    );
  };

  if (currentUser === undefined || currentUser.role !== 1) {
    history.replace("/");
    return null;
  }

  return (
    <TemplateNavigation>
      {isLoading ? (
        <DataProgress />
      ) : (
        <Box>
          <Box mb={3}>
            <Typography variant="h2">
              Form Pengajuan - {`${dataRoom.namaRuangan}`}
            </Typography>
          </Box>
          <Card>
            <CardContent>
              <Typography variant="h4">Unggah Dokumen</Typography>
              <Divider className={classes.divider} />
              <Box>
                <BaseAlert status={alertStatus} />
              </Box>
              <FormikOrderForm
                id={match.params.id}
                setAlertStatus={setAlertStatus}
              />
            </CardContent>
          </Card>
        </Box>
      )}
    </TemplateNavigation>
  );
}

export default OrderForm;
