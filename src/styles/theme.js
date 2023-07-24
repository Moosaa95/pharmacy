import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    palette: {
      primary: {
        main: '#007bff', // Customize primary color
      },
      secondary: {
        main: '#ff6f00', // Customize secondary color
      },
    },
    typography: {
      fontFamily: 'Arial, sans-serif', // Customize default font family
    },
    // Other theme configurations...
  });


  export default theme;