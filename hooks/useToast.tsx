import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function useErrorToast() {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (errorMessage) {
      Toast.show({ type: 'error', text1: errorMessage });
    }
  }, [errorMessage]);

  return setErrorMessage;
}
