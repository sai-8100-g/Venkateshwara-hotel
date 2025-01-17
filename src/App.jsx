import './App.css'
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Cart from './components/Cart'

//  write your code here
const App = () => (
  <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route exact path="/cart" element={<Cart/>} />
  </Routes>
)

export default App