import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css'

import CssBaseline from '@mui/material/CssBaseline'

import { ThemeProvider } from '@mui/material/styles'
import theme from './ui/theme'

import TopBar from './ui/TopBar'
import FooterBar from './ui/FooterBar'

import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Box from '@mui/material/Box'

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <BrowserRouter>
          <TopBar />

          {/* Dentro da prop "sx", "m" significa "margin" */}
          <Box id="innerRoot" sx={{ m: '48px 24px' }}>
            <AppRoutes />
          </Box>

          <FooterBar />
        </BrowserRouter>

      </ThemeProvider>
    </>
  )
}

export default App