import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    makeStyles,
    Typography,
    TextField,
  } from "@material-ui/core";
import TemplateNavigationAdmin from "components/layouts/TemplateNavigationAdmin";
import React, {useState} from "react";
import { pdfjs, Document, Page } from 'react-pdf';
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
  function OrderDetailAdmin() {
    const classes = useStyles();

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
return (
    <TemplateNavigationAdmin>
      <Box mb={3}>
        <Typography variant="h2">Detail Pengajuan</Typography>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h4">Surat Peminjaman Audit CCR </Typography>
          <Divider className={classes.divider} />
          <Grid container>
              <Grid container>
                  <Grid item xs={2}>
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
                  <Grid item xs={10}>
                      <Box mb={2}>
                          <Typography variant="body1">Senin, 12 Maret 2021  12.06.36</Typography>
                      </Box>
                      <Box mb={2}>
                          <Typography variant="body1">Himalkom IPB</Typography>
                      </Box>
                      <Box mb={2}>
                          <Typography variant="body1">Assalamualaikum Wr Wb dengan ini kami lampirkan surat peminjaman audit CCR </Typography>
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
          <p>Page {pageNumber} of {numPages}</p>
          </Box>
          <Typography variant="h4">Beri Tanggapan</Typography>
            <Divider className={classes.divider} />

            <div>
        <TextField 
          id="outlined-full-width"
          style={{ margin: 4 }}
          placeholder="Beri Tanggapan Disini..."
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
         </div>
         <div style={{ width: "100%", textAlign: "center" }}>
      <Box display="inline" p={1} m={1}>
      <Button variant="contained" style={{backgroundColor:"#AC0000", color :"#ffffff"}} >
           Menolak
    </Button>
      </Box>
      <Box display="inline" p={1} m={1}>
      <Button variant="contained" style={{backgroundColor:"#005108", color :"#ffffff"}}>
           Menyetujui
    </Button>
      </Box>
    </div>

          </CardContent>
          </Card>
          </TemplateNavigationAdmin>
)

  }
  export default OrderDetailAdmin;