import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import BaseTable from "components/display/BaseTable";
import TemplateNavigation from "components/layouts/TemplateNavigation";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import authService from "services/auth.service";
import UserService from "services/user.service";
import theme from "styles/theme";
import changeDateFormat from "utils/helpers/dateFormat";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.optional.contrastText,
    marginBottom: theme.spacing(3),
  },
}));

function Order() {
  const classes = useStyles();
  const currentUser = authService.getCurrentUser();
  const history = useHistory();

  useEffect(() => {
    fetchOrders();
  }, []);

  const [dataOrders, setDataOrders] = useState([]);

  const fetchOrders = async () => {
    let fetchData = [];
    UserService.getOrder()
      .then((response) => {
        const { order } = response.data;
        console.log(order);
        fetchData = order.map((data) => ({
          _id: data._id,
          user: data.user,
          roomId: data.ruangan?._id,
          roomName: data.ruangan?.namaRuangan,
          dokumen: data.dokumen,
          deskripsiPengajuan: data.deskripsiPengajuan,
          tanggalMulai: data.tanggalMulai,
          tanggalSelesai: data.tanggalSelesai,
          waktuMulai: data.waktuMulai,
          waktuSelesai: data.waktuSelesai,
          namaAdmin: data.namaAdmin,
          tglUpload: data.tglUpload,
          status: data.status,
        }));
        console.log("fetchData", fetchData);
        setDataOrders(fetchData);
      })
      .catch((err) => {
        console.log(err);
        setDataOrders(err);
      });
  };

  const handleOpenDetail = (event, rowData) => {
    console.log(rowData);
    history.push(`/detail-pengajuan/${rowData._id}`);
  };

  const handleDelete = (_oldData) => {
    const id = _oldData._id;
    console.log("ini pengajuanID", id);
    UserService.deleteOrder(id)
      .then((response) => {
        console.log(response);
        history.go(0);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  if (currentUser === undefined || currentUser.role !== 1) {
    history.replace("/");
    return null;
  }

  return (
    <TemplateNavigation>
      <Box mb={3}>
        <Typography variant="h2">Dokumen Pengajuan</Typography>
      </Box>
      <Paper className={classes.card}>
        <Box padding={3}>
          <Typography variant="body2">
            Semua dokumen pengajuan yang telah anda unggah akan muncul pada
            halaman ini
          </Typography>
        </Box>
      </Paper>
      <Paper>
        <BaseTable
          title="Data Pengajuan"
          data={dataOrders}
          columns={[
            {
              title: "Ruangan",
              field: "roomName",
            },
            {
              title: "Tanggal Upload",
              field: "tglUpload",
              render: (rowData) => (
                <div>{changeDateFormat(rowData.tglUpload, "LLL")}</div>
              ),
            },
            {
              title: "Status Pengajuan",
              field: "status",
              render: (rowData) =>
                rowData.status === 0 ? (
                  <Box
                    bgcolor="#AC0000"
                    borderRadius="4px"
                    color={theme.palette.optional.contrastText}
                    padding={1}
                    textAlign="center"
                  >
                    <Typography variant="h5">Ditolak</Typography>
                  </Box>
                ) : rowData.status === 1 ? (
                  <Box
                    bgcolor="#606060"
                    borderRadius="4px"
                    color={theme.palette.optional.contrastText}
                    padding={1}
                    textAlign="center"
                  >
                    <Typography variant="h5">Belum ada tindakan</Typography>
                  </Box>
                ) : rowData.status === 2 ? (
                  <Box
                    bgcolor="#005108"
                    borderRadius="4px"
                    color={theme.palette.optional.contrastText}
                    padding={1}
                    textAlign="center"
                  >
                    <Typography variant="h5">Diterima</Typography>
                  </Box>
                ) : (
                  ""
                ),
            },
          ]}
          handleOpenDetail={handleOpenDetail}
          onRowDelete={handleDelete}
          disableAdd
          disableUpdate
          disableExport
        />
      </Paper>
    </TemplateNavigation>
  );
}

export default Order;
