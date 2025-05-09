import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import './App.css'

import CssBaseline from '@mui/material/CssBaseline'

import { ThemeProvider } from '@mui/material/styles'
import theme from './UI/theme'

import TopBar from './UI/Topbar'
import FooterBar from './UI/Footerbar'

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <TopBar />
        <FooterBar />
      </ThemeProvider>
    </>
  )
}

export default App