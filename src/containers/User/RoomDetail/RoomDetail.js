import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import TemplateNavigation from "components/layouts/TemplateNavigation";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserService from "services/user.service";
import DataProgress from "components/loading/DataProgress";
import authService from "services/auth.service";

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

function RoomDetail({ match }) {
  const classes = useStyles();
  const currentUser = authService.getCurrentUser();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = match.params.id;
    UserService.getRoomById(id).then(
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
  }, [match.params.id]);

  const [dataRoom, setDataRoom] = useState({});
  console.log("ini dataroom", dataRoom);

  if (currentUser === undefined || currentUser.role !== 1) {
    history.replace("/");
    return null;
  }

  return (
    <TemplateNavigation>
      <Box mb={3}>
        <Typography variant="h3">Detail Ruangan</Typography>
      </Box>
      {isLoading ? (
        <DataProgress />
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h4">{dataRoom.namaRuangan}</Typography>
            <Divider className={classes.divider} />
            <CardMedia
              className={classes.media}
              image={dataRoom.photo}
              title="Ruangan"
            />
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Box mb={2}>
                  <Typography variant="body2">Deskripsi Ruangan</Typography>
                  <Typography>
                    <p>{dataRoom.deskripsiRuangan}</p>
                  </Typography>
                </Box>
                <Grid container>
                  <Grid item xs={6}>
                    <Box mb={2}>
                      <Typography variant="body2">Kapasitas Ruangan</Typography>
                      <Typography variant="h5">
                        {dataRoom.kapasistasRuangan}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2">Fasilitas Ruangan</Typography>
                      <Typography variant="h5">
                        {dataRoom.fasilitasRuangan}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box mb={2}>
                      <Typography variant="body2">Ukuran Ruangan</Typography>
                      <Typography variant="h5">
                        {dataRoom.ukuranRuangan}
                      </Typography>
                    </Box>
                    <Box mb={2}>
                      <Typography variant="body2">Jam Operasional</Typography>
                      <Typography variant="h5">{dataRoom.hariBuka}</Typography>
                      <Typography variant="h5">{`${dataRoom.hariBuka} - ${dataRoom.hariTutup}`}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2">
                        Narahubung Ruangan
                      </Typography>
                      <Typography variant="h5">
                        Bpk Hafidzan Adikoesoemo
                      </Typography>
                      <Typography variant="h5">
                        {dataRoom.narahubungRuangan}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.card}>
                  <Box mb={2} padding={3}>
                    <Typography variant="body2">
                      Jadwal Sudah Booking
                    </Typography>
                    <Typography varoamt="h5">
                      <ul>
                        <li>
                          <p>HIMALKOM IPB</p>
                          <p>Senin, 12 Maret 2021</p>
                          <p>Pukul 10.00 - 14.00 WIB</p>
                        </li>
                        <li>
                          <p>Jelajah IPB 2021</p>
                          <p>Kamis, 14 Maret 2021</p>
                          <p>Pukul 11.00 - 14.00 WIB</p>
                        </li>
                      </ul>
                    </Typography>
                  </Box>
                </Paper>
                <Box>
                  <Link to={`/form-pengajuan/${dataRoom._id}`}>
                    <Button variant="contained" color="secondary" fullWidth>
                      Ajukan Peminjaman
                    </Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </TemplateNavigation>
  );
}

export default RoomDetail;
