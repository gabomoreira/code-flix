import { createTheme } from "@mui/material";

export const appTheme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#000' },
        secondary: { main: '#E50914' },
        text: { primary: '#000', },
    },
    typography: {
        h4: {
          color: '#000',
        },
      },
})