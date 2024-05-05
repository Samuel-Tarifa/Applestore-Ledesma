import { useState, useEffect, useContext } from "react";
import { getProducts } from "../services/getProducts";
import { FiltersContext } from "../context/filterProducts";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const {filters} = useContext(FiltersContext)

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        filters.model === "All" ||(
        (product.iphoneModel[0] &&
          product.iphoneModel[0].name === filters.model) ||
        (product.iphoneModel[1] &&
          product.iphoneModel[1].name === filters.model))
      );
    });
  };

  useEffect(() => {
    getProducts().then((result) => {
      !result.success ? setError(result.error) : setError(null);
      setProducts(result.data);
    });
  }, []);

  return { products, error,filterProducts };
}
