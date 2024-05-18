import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProductCard = ({ id, image, name, price }) => {
  return (
    <Link to={`/products/${id}`}>
      <article className="flex flex-col border-gray border border-solid p-4 gap-4 items-center rounded-2xl text-center max-w-80 w-full aspect-square">
        <div className="w-2/3 h-auto aspect-square">
          <LazyLoadImage
            className="rounded-xl overflow-hidden m-auto"
            src={image}
            alt={name}
            effect="blur"
          />
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
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  id: PropTypes.string,
};

export default ProductCard;
