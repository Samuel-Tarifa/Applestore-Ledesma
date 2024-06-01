import { useProducts } from "../../hooks/useProducts";
import ProductCard from "./ProductCard";
import { useInView } from "react-intersection-observer";

const ProductsList = () => {
  const {
    products,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useProducts();
  const placeholders = [1, 2, 3];
  const [observerRef] = useInView({
    threshold: 1.0,
    onChange: (inView) => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    },
  });

  return (
    <section className="flex flex-col items-center w-full gap-8">
      <div className="grid product-list gap-4 w-full max-w-6xl place-items-center">
        {isError && !isLoading && (
          <h3>Hubo un error al cargar los productos</h3>
        )}
        {isLoading &&
          !isError &&
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
        {!isLoading &&
          !isError &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          ))}
      </div>
      {!isLoading && !isFetchingNextPage && !isError && hasNextPage && (
        <div ref={observerRef}>Cargar más</div>
      )}
    </section>
  );
};

export default ProductsList;
