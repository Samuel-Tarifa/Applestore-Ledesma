import { useState, useEffect } from "react";
import { getTypes } from "../services/getTypes";

export function useTypes() {
  const [types, setTypes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cachedTypes = JSON.parse(localStorage.getItem("types"));
    if(cachedTypes) {
      setTypes(cachedTypes)
      setError(null)
      return
    }
    getTypes().then((result) => {
      !result.success ? setError(result.error) : setError(null);
      setTypes(result.data);
      localStorage.setItem("types",JSON.stringify(result.data))
    });
  }, []);
  return { types, error };
}