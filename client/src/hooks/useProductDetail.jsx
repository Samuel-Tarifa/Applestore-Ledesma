import { useState, useEffect } from "react";
import { getProductDetail } from "../services/getProductDetail";

export function useProductDetail(id) {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductDetail(id).then((result) => {
      !result.ok ? setError(result.error.message) : setError(null);
      setProduct(result.data);
    });
  }, [id]);

  return { product, error };
}