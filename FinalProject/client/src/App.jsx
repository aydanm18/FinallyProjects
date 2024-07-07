import React, { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from './routes';
import { BasketContext } from './context/basketContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PYoRwL6alLKvkqmb2DoYlIfYYAFX5xRWINAs4bh3UiNcTwpeVgZt4rlSG1UnAU3UoTEWK5LBN5ijweDsXY3lVJv00bCn92hts');
const routes = createBrowserRouter(ROUTES);
const localBasket = JSON.parse(localStorage.getItem('basket')) || [];

if (!localBasket.length) {
  localStorage.setItem('basket', JSON.stringify([]));
}

function App() {
  const [basket, setBasket] = useState(localBasket);

  return (
    <Elements stripe={stripePromise}>
      <BasketContext.Provider value={{ basket, setBasket }}>
        <RouterProvider router={routes} />
      </BasketContext.Provider>
    </Elements>
  );
}

export default App;
