import { useParams } from "react-router-dom";
import { useProductDetail } from "../../hooks/useProductDetail";
import wppIcon from "../../assets/whatsapp.webp";

const ProductDetail = () => {
  const { productId } = useParams();
  const { product } = useProductDetail(productId);

  return (
    <section className="flex flex-col items-center w-full gap-8 max-w-3xl m-auto">
      <article className="flex flex-col pt-6 gap-4 items-center rounded-2xl text-center w-full max-w-3xl">
        <img
          className="w-2/3 h-auto rounded-xl overflow-hidden"
          src={product.image}
          alt={product.name}
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-pretty h-12 flex items-center text-2xl font-semibold">{product.name}</h3>
          <h3 className="text-xl font-semibold">${product.price}</h3>
        </div>
      </article>
      <ul className="flex flex-col gap-2">
        {product.attributes?.map(item=>(
          <li key={item.id} className="text-lg text-pretty"><strong>-</strong> {item.name}</li>
        ))}
      </ul>
      <button className="bg-green rounded-lg py-2 px-4 flex text-xl items-center gap-4 w-[40%] max-w-48  aspect-[2/1] justify-center">
        <img src={wppIcon} className="w-[30%]" alt="Logo de WhatsApp" />
        Pedir
      </button>
    </section>
  );
};

export default ProductDetail;
