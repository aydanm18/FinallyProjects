
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ROUTES } from './routes';
import { BasketContext } from './context/basketContext';
import { useState } from 'react';
function App() {
  const routes = createBrowserRouter(ROUTES)
  const localBasket = JSON.parse(localStorage.getItem('basket'))

  if (!localBasket) {
    localStorage.setItem('basket', JSON.stringify([]))
  }

  let [basket, setBasket] = useState(localBasket || [])
  return (

    <>
      <BasketContext.Provider value={{ basket, setBasket }}>
        <RouterProvider router={routes} />
      </BasketContext.Provider>
    </>
  )
}

export default App
