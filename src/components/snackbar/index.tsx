import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { useContext } from 'react';
import useSnackbar from '../../hooks/useSnackbar';
import { readerContext } from '../reader/Reader';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@material-ui/core/transitions';


function GlobalSnackbar() {
  const context = useContext(readerContext)
  if (!context) return null

  const { isSnackbar, snackbarMessage } = context

  const transition = (props: TransitionProps) => {
    return <Slide {...props} direction="up" />;
  }

  return (
    <Snackbar
      TransitionComponent={transition}
      anchorOrigin={{ vertical: 'up', horizontal: 'center' }}
      open={isSnackbar}
      message={snackbarMessage}
    />

  )
}

export default GlobalSnackbar