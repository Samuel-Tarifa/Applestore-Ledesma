import { useState, useEffect } from "react";
import { getProducts } from "../services/getProducts";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts().then((result) => {
      !result.success ? setError(result.error) : setError(null);
      setProducts(result.data);
    });
  }, []);
  return { products, error };
}