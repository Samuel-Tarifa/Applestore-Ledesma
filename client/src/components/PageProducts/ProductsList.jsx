import { useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "./ProductCard";

const ProductsList = () => {
  const { products, filterProducts } = useProducts();
  const [dataLoaded, setDataLoaded] = useState(false);
  const placeholders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  useEffect(() => {
    if (products.length > 0) setDataLoaded(true);
  }, [products]);

  const filteredProducts = filterProducts(products);

  return (
    <section className="flex flex-col items-center w-full">
      <div className="grid product-list gap-4 w-full max-w-6xl place-items-center">
        {!dataLoaded &&
          placeholders.map((item, index) => (
            <article
              key={index}
              className="flex flex-col border-gray border border-solid p-4 gap-4 items-center rounded-2xl text-center max-w-80 w-full aspect-square"
            >
              <div className="placeholder-skeleton w-2/3 h-auto rounded-xl overflow-hidden aspect-square m-auto"></div>
              <div className="flex flex-col gap-2 w-[80%] items-center">
                <div className="placeholder-skeleton h-8 w-full"></div>
                <div className="placeholder-skeleton h-4 w-1/2"></div>
              </div>
            </article>
          ))}
        {dataLoaded &&
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          ))}
      </div>
    </section>
  );
};

export default ProductsList;
