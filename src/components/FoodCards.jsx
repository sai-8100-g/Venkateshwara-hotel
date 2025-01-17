import {useContext, useState, useEffect} from 'react'
import DishesContext from '../DishesContext'
import './FoodCards.css'

const FoodCards = () => {
  const {menuData, tabId, setCartIds, setMenuData, setTabId} = useContext(
    DishesContext,
  )
  const [dishesData, setDishesData] = useState(null)

  useEffect(() => {
    const getTabData = () => {
      if (!tabId) {
        setTabId(menuData[0]?.menu_category_id)
      }
      if (menuData) {
        const tabData = menuData.find(item => item.menu_category_id === tabId)
        setDishesData(tabData?.category_dishes || [])
      }
    }

    getTabData()
  }, [menuData, tabId, setTabId])

  const handleDecrement = e => {
    const clickedId = e.currentTarget.id

    const selectedItem = dishesData.filter(item => item.dish_id === clickedId)
    const quantity = selectedItem[0].dish_quantity

    if (quantity > 0) {
      setCartIds(prevsData => {
        let newCartData
        if (prevsData.includes(clickedId)) {
          if (quantity === 1) {
            newCartData = prevsData.filter(id => id !== clickedId)
          } else {
            newCartData = prevsData
          }
        }

        return newCartData
      })
    }

    setMenuData(prevsData =>
      prevsData.map(prevsItem => {
        if (prevsItem.menu_category_id === tabId) {
          return {
            ...prevsItem,
            category_dishes: prevsItem.category_dishes.map(dishesItem =>
              dishesItem.dish_id === clickedId
                ? {
                    ...dishesItem,
                    dish_quantity:
                      dishesItem.dish_quantity > 0
                        ? dishesItem.dish_quantity - 1
                        : dishesItem.dish_quantity,
                  }
                : dishesItem,
            ),
          }
        }

        return prevsItem
      }),
    )
  }

  const handleIncrement = e => {
    const clickedId = e.currentTarget.id
    setCartIds(prevsData => {
      if (!prevsData.includes(clickedId)) {
        return [...prevsData, clickedId]
      }
      return prevsData
    })

    setMenuData(prevsData =>
      prevsData.map(prevsItem => {
        if (prevsItem.menu_category_id === tabId) {
          return {
            ...prevsItem,
            category_dishes: prevsItem.category_dishes.map(dishesItem =>
              dishesItem.dish_id === clickedId
                ? {...dishesItem, dish_quantity: dishesItem.dish_quantity + 1}
                : dishesItem,
            ),
          }
        }

        return prevsItem
      }),
    )
  }

  if (!dishesData) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
          color: 'green',
        }}
      >
        Loading...
      </div>
    )
  }

  return dishesData.map(item => (
    <section className="foodcard" key={item.dish_id}>
      <div className="hallmark">
        <div
          className={
            item.dish_Availability
              ? 'outside-hallmark'
              : 'outside-hallmark red-outside-hallmark'
          }
        >
          <div
            className={
              item.dish_Availability
                ? 'inside-hallmark'
                : 'inside-hallmark red-hallmark'
            }
          />
        </div>
      </div>
      <div className="info">
        <h2>{item.dish_name}</h2>
        <h4>
          {item.dish_currency} {item.dish_price}
        </h4>
        <p className="description">{item.dish_description}</p>
        <div className="incr-decr-conatainer">
          <button
            type="button"
            id={item.dish_id}
            onClick={e => handleDecrement(e)}
          >
            {' '}
            -{' '}
          </button>
          <p>{item.dish_quantity}</p>
          <button
            type="button"
            id={item.dish_id}
            onClick={e => handleIncrement(e)}
          >
            {' '}
            +{' '}
          </button>
        </div>
        <p className="addon-para">
          {item.addonCat.length !== 0 ? 'Customizations Available' : ''}
        </p>
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
}

export default FoodCards