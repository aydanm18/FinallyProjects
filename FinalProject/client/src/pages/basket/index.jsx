import React, { useContext, useEffect } from 'react';
import { BasketContext } from '../../context/basketContext';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from 'react-redux';
import './index.scss';

const Basket = () => {
  const user = useSelector((state) => state.user);

  const { basket, setBasket } = useContext(BasketContext);
  useEffect(() => {
    if (!user.id) {
        setBasket([]);
        localStorage.setItem('basket', JSON.stringify([]));
    }
}, [user.id, setBasket]);

  const handleIncrement = (record) => {
    const currentBasket = basket.find((x) => x._id === record._id);
    currentBasket.count += 1;
    setBasket([...basket]);
    localStorage.setItem('basket', JSON.stringify([...basket]));
  };

  const handleDecrement = (record) => {
    const currentBasket = basket.find((x) => x._id === record._id);
    if (currentBasket.count > 1) {
      currentBasket.count -= 1;
      setBasket([...basket]);
      localStorage.setItem('basket', JSON.stringify([...basket]));
    }
  };

  const handleRemove = (record) => {
    const updatedBasket = basket.filter((x) => x._id !== record._id);
    setBasket(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
  };

  const calculateSubtotal = () => {
    return basket.reduce((total, item) => {
      const itemTotal = parseFloat(item.price) * item.count;
      return total + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
  };

  const calculateOrderTotal = () => {
    return calculateSubtotal();
  };

  return (
    <div style={{ paddingTop: '50px' }} className="basket">
      <div className="container">
        <div className="row">
          <div className="col-8 col-md-12 col-sm-12 col-xs-12 table1">
          
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th></th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {basket.map((item) => (
                  <tr key={item._id}>
                    <td><img width={110} src={item.image} alt={item.title} /></td>
                    <td style={{ paddingRight: '5rem' }}>{item.title}</td>
                    <td>${parseFloat(item.price).toFixed(2)}</td>
                    <td>
                      <div className="quantity-control">
                        <button onClick={() => handleDecrement(item)}><IoIosArrowBack className='arrow-icon' /></button>
                        <span>{item.count}</span>
                        <button onClick={() => handleIncrement(item)}><IoIosArrowForward className='arrow-icon' /></button>
                      </div>
                    </td>
                    <td>${(parseFloat(item.price) * item.count).toFixed(2)}</td>
                    <td>
                      <button onClick={() => handleRemove(item)}><MdDeleteOutline  /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
       
          </div>
          <div className="col-4 col-md-12 col-sm-12 col-xs-12 box">
            <h3>Cart Total</h3>
            <table>
              <tbody>
                <tr>
                  <td style={{ paddingTop: '30px', paddingRight: '35px' }}>Item(s) Subtotal</td>
                  <td style={{ paddingTop: '30px' }}>${calculateSubtotal().toFixed(2)}</td>
                </tr>
                <tr>
                  <td style={{ paddingTop: '20px', paddingRight: '35px' }}>Order Total</td>
                  <td style={{ paddingTop: '20px' }}>${calculateOrderTotal().toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <button><Link className='links' to={'/checkout'}>PROCEED TO CHECKOUT</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
