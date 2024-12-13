import { useContext, useState, useEffect, useCallback } from "react";
import { getProducts } from "../services/getProducts";
import { FiltersContext } from "../context/filterProducts";

export function useProducts() {
  const { filters } = useContext(FiltersContext);

  const [products, setProducts] = useState([]); // Productos filtrados que se muestran
  const [allProducts, setAllProducts] = useState([]); // Todos los productos recuperados
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  // Función para hacer fetch de productos
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const cachedProducts = JSON.parse(localStorage.getItem("allProducts"));
      if (cachedProducts) {
        setAllProducts(cachedProducts);
        setIsLoading(false);
        return;
      }

      const response = await getProducts();
      if (!response.ok) {
        throw response.error;
      }
      const products = response.data.flatMap((product) => {
        if (product.type === "Fundas") {
          return {
            ...product,
            id: product.category + "$" + product.iphoneModel.join("-"),
          };
        } else {
          return product;
        }
      });
      localStorage.setItem("allProducts", JSON.stringify(products));
      setAllProducts(products); // Cachear en memoria también
    } catch (error) {
      setIsError(true);
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (!allProducts.length) return;

    const { model, type } = filters;

    const filteredProducts = allProducts.filter((e) => {
      if (!e.iphoneModel) {
        return e.type === type || type === "All";
      }
      return (
        (e.iphoneModel.includes(model) || model === "All") &&
        (e.type === type || type === "All")
      );
    });

    setProducts(filteredProducts);
  }, [filters, allProducts]);

  return {
    products,
    isError,
    isLoading,
    error,
  };
}
