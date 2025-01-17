import {useContext} from 'react'
import './Tabs.css'
import DishesContext from '../DishesContext'

const Tabs = () => {
  const {menuData, setTabId, tabId} = useContext(DishesContext)

  const handleTabs = e => {
    const clickedId = e.currentTarget.id
    setTabId(clickedId)
  }
  return (
    <section className="tabs">
      {menuData &&
        menuData.map(item => (
          <button
            className={item.menu_category_id === tabId ? 'button-selected' : ''}
            id={item.menu_category_id}
            onClick={e => handleTabs(e)}
            key={item.menu_category_id}
            type="button"
          >
            {item.menu_category}
          </button>
        ))}
    </section>
  )
}
export default Tabs