
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ROUTES } from './routes';
import { FavContext } from './context/favContext';
import { BasketContext } from './context/basketContext';
import { useState } from 'react';
function App() {
  const routes = createBrowserRouter(ROUTES)
  const localFav = JSON.parse(localStorage.getItem('fav'));
  const localBasket = JSON.parse(localStorage.getItem('basket'))
  if (!localFav) {
    localStorage.setItem('fav', JSON.stringify([]))
  }
  if (!localBasket) {
    localStorage.setItem('basket', JSON.stringify([]))
  }
  let [fav, setFav] = useState(localFav || [])
  let [basket, setBasket] = useState(localBasket || [])
  return (

    <>
     <BasketContext.Provider value={{basket,setBasket}}>
      <FavContext.Provider value={{ fav, setFav }}>
        <RouterProvider router={routes} />
      </FavContext.Provider>
      </BasketContext.Provider>

    </>
  )
}

export default App
