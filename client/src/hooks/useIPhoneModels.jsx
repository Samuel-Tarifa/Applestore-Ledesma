import { useState, useEffect } from "react";
import { getIPhoneModels } from "../services/getIPhoneModels";

export function useIPhoneModels() {
  const [IPhoneModels, setIPhoneModels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
      const cachedModels = JSON.parse(localStorage.getItem("iphoneModel"));
      if (cachedModels) {
        setIPhoneModels(cachedModels.data);
        setError(null);
        return;
      }
    getIPhoneModels().then((result) => {
      !result.success ? setError(result.error) : setError(null);
      setIPhoneModels(result.data);
      localStorage.setItem("iphoneModel", JSON.stringify(result));
    });
  }, []);
  return { IPhoneModels, error };
}
