import { useState, useEffect } from "react";
import { getCategory } from "../services/getCategory.js";

export function useCategory() {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cachedCategory = JSON.parse(localStorage.getItem("category"));
    if (cachedCategory) {
      setCategory(cachedCategory);
      setError(null);
      return;
    }
    getCategory().then((result) => {
      !result.success ? setError(result.error) : setError(null);
      setCategory(result.data);
      localStorage.setItem("category", JSON.stringify(result.data));
    });
  }, []);
  return { category, error };
}
