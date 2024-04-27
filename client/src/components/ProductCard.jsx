import PropTypes from "prop-types";

const ProductCard = ({ image, name, price }) => {
  return (
    <article className="flex flex-col border-gray border border-solid p-4 gap-4 items-center">
      <img className="w-2/3 h-auto" src={image} alt={name} />
      <div className="flex flex-col gap-2">
        <h3>{name}</h3>
        <h3>{price}</h3>
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
