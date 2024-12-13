import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductCard = ({ id, imageList, name, price, product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageList.length);
      }, 200);
    }, 3000);
    return () => clearInterval(interval);
  }, [imageList.length]);

  return (
    <Link to={`/products/${id}`} state={{ product }}>
      <article className="flex flex-col border-gray border border-solid p-4 gap-4 items-center rounded-2xl text-center max-w-80 w-full relative">
        <div className="absolute top-3 right-3 z-10 bg-black/[0.15] rounded-full w-6 h-auto">{`${
          currentImageIndex + 1
        }/${imageList.length}`}</div>
        <div className="w-2/3 h-auto aspect-[3/4] overflow-hidden rounded-xl">
          {imageList.length > 1 ? (
            <div
              className="flex flex-nowrap h-full transition-transform duration-300"
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
              }}
            >
              {imageList.map((element) => (
                <img
                  key={element.id}
                  className={`rounded-xl m-auto w-full`}
                  src={element.image}
                  alt={name}
                />
              ))}
            </div>
          ) : (
            <img src={imageList[0].image} alt={name} />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-pretty h-12 flex items-center justify-center">
            {name}
          </h3>
          <h3>${price}</h3>
        </div>
      </article>
    </Link>
  );
};

ProductCard.propTypes = {
  imageList: PropTypes.array,
  name: PropTypes.string,
  price: PropTypes.string,
  id: PropTypes.string,
  product: PropTypes.object,
};

export default ProductCard;
