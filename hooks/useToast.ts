import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function useToast() {
  const [errorMessage, toastError] = useState('');
  const [successMessage, toastSuccess] = useState('');

  useEffect(() => {
    if (successMessage !== '') {
      Toast.show({ type: 'success', text1: successMessage });
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage !== '') {
      Toast.show({ type: 'error', text1: errorMessage });
    }
  }, [errorMessage]);

  return { toastSuccess, toastError };
}
