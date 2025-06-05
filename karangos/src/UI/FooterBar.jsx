import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import LocalCafeIcon from '@mui/icons-material/LocalCafe';

export default function FooterBar() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: 'action.disabledBackground',
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',  // posição fixa
        bottom: 0,          // na parte de baixo da página
        width: '100vw'      // 100% da largura da viewport
      }}
    >
      <Typography 
        variant="caption" 
        gutterBottom
        sx={{
          '& a': {  // Altera a cor do link (a) dentro do Typography
            color: 'secondary.light'
          }
        }}
      >
        Desenvolvido e mantido com <LocalCafeIcon fontSize="small" /> por <a href="mailto:professor@faustocintra.com.br">Prof. Fausto Cintra</a>
      </Typography>
    </Box>
  );
}