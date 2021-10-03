import { useState } from "react";

export type ToastOptions = {
  timeout?: number
}

export default function useSnackbar() {
  const [isSnackbar, setSnackbar] = useState(false)
  const [message, setMessage] = useState('')
  let timer: null | number = null

  const showToast = (message: string, { timeout }: ToastOptions = { timeout: 2000 }) => {
    if (timer) {
      clearTimeout(timer)
      timer = null
      setSnackbar(false)
    }

    setMessage(message)
    setSnackbar(true)
    timer = window.setTimeout(() => {
      setSnackbar(false)
    }, timeout);
  }

  return {
    snackbarMessage: message,
    isSnackbar,
    setSnackbar,
    showToast
  }
}