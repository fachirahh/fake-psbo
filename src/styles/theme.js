/**
 * theme for MUI
 * TODO: create a theme object as per designs
 */
import { createMuiTheme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#020153",
    },
    secondary: {
      main: "#020179",
    },
    tertiary: {
      main: "#03019F",
    },
    success: {
      main: "#005108",
    },
    merah: {
      main: "#AC0000",
    },
    black: {
      primary: "#3D434A",
      secondary: "#515B69",
      tertiary: "#E4E4E4",
    },
    error: {
      main: red.A400,
    },
    optional: {
      main: "#1E1E1E",
      contrastText: "#FFFFFF",
    },
  },

  typography: {
    fontFamily: ['"Poppins"', "sans-serif"].join(","),
    h1: {
      fontSize: "36px",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "18px",
      fontWeight: 600,
    },
    h4: {
      fontSize: "16px",
      fontWeight: 600,
    },
    h5: {
      fontSize: "14px",
    },
    body1: {
      fontSize: "12px",
    },
    body2: {
      fontSize: "14px",
      fontWeight: 600,
    },
  },
});

export default theme;
