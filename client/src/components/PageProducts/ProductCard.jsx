import PropTypes from "prop-types";

const ProductCard = ({ image, name, price }) => {
  return (
    <article className="flex flex-col border-gray border border-solid p-4 gap-4 items-center rounded-2xl text-center max-w-80">
      <img className="w-2/3 h-auto rounded-xl overflow-hidden" src={image} alt={name} />
      <div className="flex flex-col gap-2">
        <h3 className="text-pretty h-12 flex items-center">{name}</h3>
        <h3>${price}</h3>
      </div>
    </article>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
};

export default ProductCard;
