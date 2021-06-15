import {
  Box,
  makeStyles,
  Typography,
  Card,
  CardContent,
  Divider,
  Grid,
} from "@material-ui/core";
import TemplateNavigation from "components/layouts/TemplateNavigation";
import React, { useEffect, useState } from "react";
import theme from "styles/theme";
import BaseTable from "components/display/BaseTable";
import { pdfjs, Document, Page } from "react-pdf";
import UserService from "services/user.service";
import changeDateFormat from "utils/helpers/dateFormat";
import DataProgress from "components/loading/DataProgress";
import authService from "services/auth.service";
import { useHistory } from "react-router";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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

function OrderDetail({ match }) {
  const classes = useStyles();
  const currentUser = authService.getCurrentUser();
  const history = useHistory();

  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  const [dataOrder, setDataOrder] = useState({});

  const fetchOrderDetail = async () => {
    let fetchData = [];
    const id = match.params.id;
    UserService.getOrderById(id)
      .then((response) => {
        const data = response.data.order;
        fetchData = {
          _id: data._id,
          userId: data.user?.id,
          userName: data.user?.nama,
          roomId: data.ruangan?._id,
          roomName: data.ruangan?.namaRuangan,
          dokumen: data.dokumen,
          deskripsiPengajuan: data.deskripsiPengajuan,
          tanggalMulai: data.tanggalMulai,
          tanggalSelesai: data.tanggalSelesai,
          waktuMulai: data.waktuMulai,
          waktuSelesai: data.waktuSelesai,
          namaAdmin: data.namaAdmin,
          tglUpload: changeDateFormat(data.tglUpload, "LLLL"),
          status: data.status,
          tanggapan: data.tanggapan ?? "Tidak ada tanggapan",
        };
        console.log("fetchData", fetchData);
        setDataOrder(fetchData);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setDataOrder(err);
      });
  };

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const dataTable = [
    {
      name: dataOrder.userName,
      status: dataOrder.status,
      response: dataOrder.tanggapan,
    },
  ];

  if (currentUser === undefined || currentUser.role !== 1) {
    history.replace("/");
    return null;
  }

  return (
    <TemplateNavigation>
      <Box mb={3}>
        <Typography variant="h2">Detail Pengajuan</Typography>
      </Box>
      {isLoading ? (
        <DataProgress />
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h4">{dataOrder.roomName}</Typography>
            <Divider className={classes.divider} />
            <Grid container>
              <Grid container>
                <Grid item xs={3}>
                  <Box mb={2}>
                    <Typography variant="h5">Tanggal Upload</Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography variant="h5">Oleh</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5">Deskripsi</Typography>
                  </Box>
                </Grid>
                <Grid item xs={9}>
                  <Box mb={2}>
                    <Typography variant="body1">
                      {dataOrder.tglUpload}
                    </Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography variant="body1">Himalkom IPB</Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography variant="body1">
                      Assalamualaikum Wr Wb dengan ini kami lampirkan surat
                      peminjaman audit CCR{" "}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Box>
              <Document
                file={"http://localhost:3000/SPJ KOMUNITAS HIMALKOM 2021.pdf"}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={console.error}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </Box>
            <Typography variant="h4">Tujuan Pengajuan</Typography>
            <Divider className={classes.divider} />
            <BaseTable
              data={dataTable}
              columns={[
                {
                  title: "Nama",
                  field: "name",
                },
                {
                  title: "Status",
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
                {
                  title: "Tanggapan",
                  field: "response",
                },
              ]}
              disableAdd
              disableUpdate
              disableExport
              disableDelete
              disableDetail
              disableActions
            />
          </CardContent>
        </Card>
      )}
    </TemplateNavigation>
  );
}

export default OrderDetail;
