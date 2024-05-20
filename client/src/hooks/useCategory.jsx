import { useState, useEffect } from "react";
import { getCategory } from "../services/getCategory.js";

export function useCategory() {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategory().then((result) => {
      !result.success ? setError(result.error) : setError(null);
      setCategory(result.data);
    });
  }, []);
  return { category, error };
}
