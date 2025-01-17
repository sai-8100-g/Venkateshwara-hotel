import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {IoCartOutline} from 'react-icons/io5'
import './RestaurantNav.css'
import DishesContext from '../DishesContext'

const RestaurantNav = () => {
  const {cartIds} = useContext(DishesContext)

  return (
    <>
      <nav>
        <Link to="/" className="nav-heading">
          <img
            src="https://wallpaperaccess.com/full/5813589.jpg"
            alt="venkateshwara-img"
            className="website-logo"
          />
          Venkateshwara Hotel
        </Link>
        <Link to="/cart" className="cart-container">
          <IoCartOutline className="cart" />
          <div className="cart-para">{cartIds?.length}</div>
        </Link>
      </nav>
    </>
  )
}

export default RestaurantNav