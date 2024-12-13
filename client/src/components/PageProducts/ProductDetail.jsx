import { useParams } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import wppIcon from "../../assets/whatsapp.webp";
import { useState } from "react";
import { useProductDetail } from "../../hooks/useProductDetail";

const ProductDetail = () => {
  const { productId } = useParams();
  const { product, error, loading } = useProductDetail(productId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log(product);

  if (!product?.name && !loading) {
    product.name = product.category + " " + product.iphoneModel;
  }

  const numberToMessage = import.meta.env.VITE_NUMBER_WPP;
  const url = "https://applestore-ledesma.vercel.app/products";

  const id=encodeURIComponent(product.id)

  const wppMessage = product
    ? `Hola! me interesa el ${product.name} que vi en la web de applestore-ledesma: ${url}/${id}`
    : "";

  return error ? (
    <h4> Hubo un error al cargar este producto </h4>
  ) : (
    <section className="flex flex-col items-center justify-center w-full gap-4">
      {loading ? (
        <div className="flex-col flex w-full max-w-[48rem]">
          <div className="placeholder-card self-start">
            <div className="flex flex-col items-center">
              <div className="image-placeholder placeholder-skeleton max-w-96"></div>
              <div className="name-placeholder placeholder-skeleton"></div>
              <div className="price-placeholder placeholder-skeleton"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <article className="flex flex-col gap-4 items-center rounded-2xl text-center w-full max-w-3xl">
            <h3 className="text-pretty flex items-center text-lg font-semibold">
              {product.name}
            </h3>
            <div className="relative w-2/3 aspect-auto max-w-72">
              {product.images.length > 1 ? (
                <div className="relative">
                  <div className="absolute top-3 right-3 z-10 bg-black/[0.6] rounded-full h-auto text-white p-1">{`${
                    currentImageIndex + 1
                  }/${product.images.length}`}</div>
                  <button
                    onClick={() => {
                      setCurrentImageIndex((prev) =>
                        prev > 0 ? prev - 1 : product.images.length - 1
                      );
                    }}
                    className="absolute left-0 z-10 translate-x-[-140%] top-1/2 translate-y-[-50%] bg-black/[0.4] text-white p-2 rounded-full"
                  >
                    &lt;
                  </button>
                  <div className="overflow-hidden">
                    <div
                      className="flex flex-nowrap transition-transform duration-300"
                      style={{
                        transform: `translateX(-${currentImageIndex * 100}%)`,
                      }}
                    >
                      {product.images.map((e) => (
                        <img
                          key={e.id}
                          className="rounded-xl m-auto h-full"
                          src={e.image}
                          alt={product.name}
                        />
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentImageIndex((prev) =>
                        prev < product.images.length - 1 ? prev + 1 : 0
                      );
                    }}
                    className="absolute right-0 translate-x-[140%] z-10 top-1/2 translate-y-[-50%] bg-black/[0.4] text-white p-2 rounded-full"
                  >
                    &gt;
                  </button>
                </div>
              ) : (
                <img
                  className="rounded-xl overflow-hidden m-auto h-full"
                  src={product.images[0].image  }
                  alt={product.name}
                />
              )}
            </div>

            <h3 className="text-xl font-semibold">${product.price}</h3>
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
            className="bg-green rounded-lg px-2 flex text-xl items-center gap-2 w-[40%] max-w-24 py-2 justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={wppIcon} className="w-[20%]" alt="Logo de WhatsApp" />
            Pedir
          </a>
        </>
      )}
    </section>
  );
};

export default ProductDetail;
