import { useParams } from "react-router-dom";
import { useProductDetail } from "../../hooks/useProductDetail";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import wppIcon from "../../assets/whatsapp.webp";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const { productId } = useParams();
  const { product } = useProductDetail(productId);

  const numberToMessage = import.meta.env.VITE_NUMBER_WPP;
  const url = "https://applestore-ledesma.vercel.app/products";

  const wppMessage = product
    ? `Hola! me interesa el ${product.name} que vi en la web de applestore-ledesma: ${url}/${product.id}`
    : "";

  useEffect(() => {
    if (product && product.image && product.name && product.price)
      setDataLoaded(true);
  }, [product]);

  return (
    <section className="flex flex-col items-center w-full gap-8 max-w-3xl">
      {!dataLoaded ? (
        <div className="placeholder-card self-start">
          <div className="flex flex-col items-center">
            <div className="image-placeholder placeholder-skeleton"></div>
            <div className="name-placeholder placeholder-skeleton"></div>
            <div className="price-placeholder placeholder-skeleton"></div>
          </div>
        </div>
      ) : (
        <>
          <article className="flex flex-col pt-6 gap-4 items-center rounded-2xl text-center w-full max-w-3xl">
            <div className="w-2/3 aspect-square">
              <LazyLoadImage
                className=" h-auto rounded-xl overflow-hidden m-auto"
                src={`${product.image}`}
                alt={product.name}
                effect="blur"
                onLoad={() => {
                  setDataLoaded(true);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-pretty h-12 flex items-center text-2xl font-semibold">
                {product.name}
              </h3>
              <h3 className="text-xl font-semibold">${product.price}</h3>
            </div>
          </article>
          <ul className="flex flex-col gap-2">
            {product.attributes?.map((item) => (
              <li key={item.id} className="text-lg text-pretty">
                <strong>-</strong> {item.name}
              </li>
            ))}
          </ul>
          <a
            href={`https://wa.me/${numberToMessage}?text=${encodeURIComponent(
              wppMessage
            )}`}
            className="bg-green rounded-lg py-2 px-4 flex text-xl items-center gap-4 w-[40%] max-w-40  aspect-[2/1] justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={wppIcon} className="w-[30%]" alt="Logo de WhatsApp" />
            Pedir
          </a>
        </>
      )}
    </section>
  );
};

export default ProductDetail;
