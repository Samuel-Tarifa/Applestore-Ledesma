import { useState, useEffect } from "react";
import { getProducts } from "../services/getProducts";

export function useProductDetail(id) {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts(id).then((result) => {
      !result.success ? setError(result.error) : setError(null);
      setProduct(result.data);
    });
  }, [id]);

  return { product, error };
}