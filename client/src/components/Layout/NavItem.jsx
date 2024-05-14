import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

const NavItem=({title,url})=>{
  return(
  <Link to={url}>
  <li>{title}</li>
  </Link>
)
}

NavItem.propTypes={
  title:PropTypes.string.isRequired,
  url:PropTypes.string.isRequired
}

export default NavItem