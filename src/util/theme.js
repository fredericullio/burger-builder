import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#52310a",
        light: '#99703F',
        
      },
      secondary: {
        main: '#b36600',
        light: 'rgb(207, 143, 46)',
        dark: '#8c4e00'
      },
      info: {
        main: '#40a4c8'
      },
      warning: {
        main: '#DAD735',
        dark: '#A0DB41'
      }
    },
  });

  export default theme;