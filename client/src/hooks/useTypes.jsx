import { useState, useEffect } from "react";
import { getTypes } from "../services/getTypes";

export function useTypes() {
  const [types, setTypes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTypes().then((result) => {
      !result.success ? setError(result.error) : setError(null);
      setTypes(result.data);
    });
  }, []);
  return { types, error };
}