import { useParams } from "react-router-dom";
import { useProductDetail } from "../../hooks/useProductDetail";
import ProductCard from "./ProductCard";

const ProductDetail = () => {
  const { productId } = useParams();
  const { product } = useProductDetail(productId);

  return (
    <section>
      <article className="flex flex-col border-gray border border-solid p-4 gap-4 items-center rounded-2xl text-center max-w-80">
        <img
          className="w-2/3 h-auto rounded-xl overflow-hidden"
          src={product.image}
          alt={product.name}
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-pretty h-12 flex items-center">{product.name}</h3>
          <h3>${product.price}</h3>
        </div>
      </article>
    </section>
  );
};

export default ProductDetail;
