import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavItem = ({ title, url }) => {
  return (
    <li>
      <Link to={url}>{title}</Link>
    </li>
  );
};

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default NavItem;
