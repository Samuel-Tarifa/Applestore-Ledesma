import { useContext } from "react";
import { getProducts } from "../services/getProducts";
import { FiltersContext } from "../context/filterProducts";
import filterProducts from "../utils/filterProducts";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useProducts() {
  const { filters } = useContext(FiltersContext);

  if (!filters) console.error("Filters Context must be used within provider");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["products", filters],
    queryFn: ({ pageParam }) => getProducts({ pageParam, ...filters }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.info.nextPage,
  });

  const products = data?.pages.flatMap((page) => page.data);

  return {
    products: filterProducts(products, filters),
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    error,
    isFetchingNextPage,
  };
}
