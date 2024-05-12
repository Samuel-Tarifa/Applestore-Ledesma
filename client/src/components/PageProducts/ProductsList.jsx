import { useProducts } from "../../hooks/useProducts";
import ProductCard from "./ProductCard";

const ProductsList = () => {
  const { products, filterProducts } = useProducts();

  const filteredProducts = filterProducts(products);

  return (
    <section className="flex flex-col items-center">
      <div className="grid product-list gap-4 w-full max-w-6xl place-items-center">
        {filteredProducts?.map((product) => (
          <ProductCard
            key={product.id}
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
