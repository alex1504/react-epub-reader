import Snackbar from '@mui/material/Snackbar';
import { useContext } from 'react';
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

  const anchorOriginOptions = { vertical: 'up', horizontal: 'center' }

  return (
    <Snackbar
      TransitionComponent={transition}
      anchorOrigin={anchorOriginOptions}
      open={isSnackbar}
      message={snackbarMessage}
    />
  )
}

export default GlobalSnackbar