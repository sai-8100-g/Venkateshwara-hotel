import {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import DishesContext from './DishesContext'


const DishesProvider = ({children}) => {
  const [menuData, setMenuData] = useState('')
  const [tabId, setTabId] = useState()
  const [cartIds, setCartIds] = useState([])

  useEffect(() => {
    const fetchDetails = async () => {
      const url =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
      const options = {
        method: 'GET',
      }

      try {
        const response = await fetch(url, options)
        if (response.ok) {
          const jsonData = await response.json()
          setMenuData(() =>
            jsonData[0].table_menu_list.map(item => ({
              ...item,
              category_dishes: item.category_dishes.map(dishesItem => ({
                ...dishesItem,
                dish_quantity: 0,
              })),
            })),
          )
        }
      } catch (err) {
        throw new Error('error occured while fecthing the recipes', err)
      }
    }

    fetchDetails()
  }, [])

  return (
    <DishesContext.Provider
      value={{menuData, setMenuData, tabId, setTabId, cartIds, setCartIds}}
    >
      {children}
    </DishesContext.Provider>
  )
}


DishesProvider.propTypes = {
  children: PropTypes.node.isRequired,
}


export default DishesProvider

