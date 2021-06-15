import {
  Box,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import BaseTable from "components/display/BaseTable";
import TemplateNavigationAdmin from "components/layouts/TemplateNavigationAdmin";
import React from "react"; 
import theme from "styles/theme";
const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.optional.contrastText,
    marginBottom: theme.spacing(3),
  },
}));
function HomeAdmin() {
  const classes = useStyles();

  const dataTable = [
    {
      title: "Surat Peminjaman Audit CCR",
      date: "Senin, 12 Maret 2021 - 12.06.36",
      status: "Belum ada tindakan",
    },
    {
      title: "Surat Peminjaman Audit Toyib",
      date: "Senin, 13 Maret 2021 - 12.06.36",
      status: "Menyetujui",
    },
    {
      title: "Surat Peminjaman Audit Mandiri",
      date: "Senin, 14 Maret 2021 - 12.06.36",
      status: "Menolak",
    },
  ];

  return (
    <TemplateNavigationAdmin>
      <Box mb={3}>
        <Typography variant="h2">Beranda</Typography>
      </Box>
        <Paper className={classes.card}>
        <Box padding={3}>
        <Typography variant="h4">
                  Selamat datang, Penjaga Ruangan
                </Typography>
                <Typography>
                Silahkan berikan tanggapan terhadap daftar pengajuan peminjaman yang anda terima! Anda harus melihat detail pengajuan terlebih dahulu untuk memberikan tanggapan.
                </Typography>
        </Box>
      </Paper>
          <Paper>
        <BaseTable
          title="Data Pengajuan"
          data={dataTable}
          columns={[
            {
              title: "Judul",
              field: "title",
            },
            {
              title: "Tanggal Upload",
              field: "date",
            },
            {
              title: "Status Pengajuan",
              field: "status",
              render: (rowData) =>
                rowData.status === "Belum ada tindakan" ? (
                  <Box
                    bgcolor="#606060"
                    borderRadius="4px"
                    color={theme.palette.optional.contrastText}
                    padding={1}
                    textAlign="center"
                  >
                    <Typography variant="h5">{rowData.status}</Typography>
                  </Box>
                ) : rowData.status === "Menyetujui" ? (
                  <Box
                    bgcolor="#005108"
                    borderRadius="4px"
                    color={theme.palette.optional.contrastText}
                    padding={1}
                    textAlign="center"
                  >
                    <Typography variant="h5">{rowData.status}</Typography>
                  </Box>
                ) : rowData.status === "Menolak" ? (
                  <Box
                    bgcolor="#AC0000"
                    borderRadius="4px"
                    color={theme.palette.optional.contrastText}
                    padding={1}
                    textAlign="center"
                  >
                    <Typography variant="h5">{rowData.status}</Typography>
                  </Box>
                ) : (
                  ""
                ),
            },
          ]}
          //   handleOpenDetail={}
          disableAdd
          disableUpdate
          disableExport
        />
      </Paper>
    </TemplateNavigationAdmin>
  );
}

export default HomeAdmin;