import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import MuiAlert from '@mui/material/Alert'
import theme from './theme'

const ConfirmDialog = ({ open, title, question, onConfirm, onCancel }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {question}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm} color="primary" variant="outlined">OK</Button>
          <Button onClick={onCancel} color="primary" autoFocus>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const feedbackConfirm = (question, title = 'Confirmar') => {
  
  const slot = document.createElement('div')
  document.querySelector('#innerRoot').appendChild(slot)
  const outlet = createRoot(slot)

  return new Promise(resolve => {

    const handleClose = result => {
      outlet.unmount(slot)
      document.querySelector('#innerRoot').removeChild(slot)
      resolve(result)
    }

    outlet.render(
      <ThemeProvider theme={theme}>
        <ConfirmDialog
          open={true}
          title={title}
          question={question}
          onConfirm={() => handleClose(true)}
          onCancel={() => handleClose(false)}
        />
      </ThemeProvider>
    )

  })

}

const Notification = ({open, message, severity, timeout, onClose}) => {

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })

  return (
    <Snackbar open={open} autoHideDuration={timeout} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        { message }
      </Alert>
    </Snackbar>
  )
}

const feedbackNotify = (message, severity = 'success', timeout = 4000, onClose = () => {}) => {
  
  const slot = document.createElement('div')
  document.querySelector('#innerRoot').appendChild(slot)
  const outlet = createRoot(slot)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    outlet.unmount(slot)
    document.querySelector('#innerRoot').removeChild(slot)
    if(onClose instanceof Function) onClose()
  }

  outlet.render(
    <Notification
      open={true}
      message={message}
      severity={severity}
      timeout={timeout}
      onClose={handleClose}
    />
  )

}

const Wait = ({open}) => {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

const feedbackWait = (show = true) => {
  if(show) {
    const slot = document.createElement('div')
    slot.className = 'feeback-wait-slot'
    document.querySelector('#innerRoot').appendChild(slot)

    const outlet = createRoot(slot)
    outlet.render(<Wait open={true} />)
  }
  else {
    const slots = document.querySelectorAll('.feeback-wait-slot')
    slots.forEach(slot => document.querySelector('#innerRoot').removeChild(slot))
  }
}

export { feedbackConfirm, feedbackNotify, feedbackWait }