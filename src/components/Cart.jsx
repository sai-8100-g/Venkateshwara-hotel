import {useContext, useEffect, useState} from 'react'
import DishesContext from '../DishesContext'
import RestaurantNav from './RestaurantNav'
import './Cart.css'

const Cart = () => {
  const {cartIds, menuData, setCartIds, setMenuData} = useContext(DishesContext)
  const [dishesData, setDishesData] = useState('')

  useEffect(() => {
    const getCartData = async () => {
      if (cartIds.length > 0) {
        const cartIdsSet = new Set(cartIds)

        const filterCartData = menuData.flatMap(menuItem =>
          menuItem.category_dishes.filter(dishItem =>
            cartIdsSet.has(dishItem.dish_id),
          ),
        )

        setDishesData(filterCartData)
      } else {
        setDishesData([])
      }
    }

    getCartData()
  }, [cartIds, menuData])

  const onClickToCompleteOrder = e => {
    const clickedId = e.currentTarget.id

    const newMenuData = menuData.map(menuItem => ({
      ...menuItem,
      category_dishes: menuItem.category_dishes.map(dishesItem =>
        dishesItem.dish_id === clickedId
          ? {...dishesItem, dish_quantity: 0}
          : dishesItem,
      ),
    }))

    setMenuData(newMenuData)

    setCartIds(prevState => {
      if (prevState.length === 1) {
        return []
      }
      return prevState.filter(id => id !== clickedId)
    })
  }

  const cartCards = () =>
    dishesData.map(item => (
      <section className="foodcard" key={item.dish_id}>
        <div className="info">
          <h2>{item.dish_name}</h2>
          <h4>
            {item.dish_currency} {item.dish_price}
          </h4>
          <p className="description">{item.dish_description}</p>
          <p>Ordered quantity : {item.dish_quantity}</p>
          <button
            id={item.dish_id}
            type="button"
            onClick={onClickToCompleteOrder}
            className="serve-button"
          >
            Order Complete
          </button>
        </div>
        <p className="calories-para">
          {item.dish_calories} <br /> Calories
        </p>
        <div className="cusine">
          <img src={item.dish_image} alt="food-receipe" />
          <p className="cusine-para">
            {item.dish_calories} <br /> Calories{' '}
          </p>
        </div>
      </section>
    ))

  return (
    <>
      <RestaurantNav />
      {dishesData.length > 0 ? (
        cartCards()
      ) : (
        <div className="no-order-container">
          <img
            src="https://res.cloudinary.com/dkbtw06um/image/upload/f_auto,q_auto/krzumgin26dpwyrzykdf"
            alt="no order-img"
          />
          <p>We haven&apos;t received any orders</p>
        </div>
      )}
    </>
  )
}

export default Cart