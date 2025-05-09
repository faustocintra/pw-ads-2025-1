import { createTheme } from '@mui/material/styles'
import { yellow, pink } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: yellow[500]
    },
    secondary: {
      main: pink[500]
    }
  },
  typography: {
    h1: {
      fontSize: '3rem',
      fontWeight: 'bold'
    }
  }
})

export default theme