import { createTheme } from "@mui/material/styles";
import { purple, blue } from "@mui/material/colors";
const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: purple[500],
      darker: "#053e85",
    },
    neutral: {
      main: blue[400],
      contrastText: "#fff",
    },
    secondary: {
      main: "#9195AD",
      contrastText: "#fff",
    },
  },
});

export default theme;
