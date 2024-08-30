import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  spacing: (factor) => `${0.4 * factor}rem`,
  palette: {
    primary: {
      main: "#0E51F1",
    },
    text: {
      primary: "#0E1013",
      secondary: "#E3E7EC",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: 16,
    customFontSizes: {
      large: "1.5rem", //24px
      medium: "1.375rem", //22px
      small: "1.25rem", //20px
      xsmall: "1.125rem", //18px
      xxsmall: "1rem", //16px
    },
  },
});

export default theme;
