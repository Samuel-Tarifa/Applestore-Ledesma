import { useState, useEffect } from "react";
import { getIPhoneModels } from "../services/getIPhoneModels";

export function useIPhoneModels() {
  const [IPhoneModels, setIPhoneModels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getIPhoneModels().then((result) => {
      !result.success ? setError(result.error) : setError(null);
      setIPhoneModels(result.data);
    });
  }, []);
  return { IPhoneModels, error };
}
