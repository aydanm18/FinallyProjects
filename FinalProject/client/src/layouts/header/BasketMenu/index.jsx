import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.scss';
import { BasketContext } from '../../../context/basketContext';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

const BasketMenu = ({ setShowBasket, showBasket }) => {
    const { basket, setBasket } = useContext(BasketContext);
    const navigate = useNavigate();

    const handleIncrement = (recordId) => {
        const updatedBasket = basket.map(item => 
            item._id === recordId ? { ...item, count: item.count + 1 } : item
        );
        setBasket(updatedBasket);
        localStorage.setItem('basket', JSON.stringify(updatedBasket));
    };

    const handleDecrement = (recordId) => {
        const updatedBasket = basket.map(item => 
            item._id === recordId && item.count > 1 ? { ...item, count: item.count - 1 } : item
        );
        setBasket(updatedBasket);
        localStorage.setItem('basket', JSON.stringify(updatedBasket));
    };

    const handleRemove = (recordId) => {
        const updatedBasket = basket.filter(item => item._id !== recordId);
        setBasket(updatedBasket);
        localStorage.setItem('basket', JSON.stringify(updatedBasket));
    };
    const subtotal = basket.reduce((total, item) => total + item.price * item.count, 0);
    return (
        <div className={`basket-menu ${showBasket ? 'open' : ''}`}>
            <div className="basketTitle">
                <h3>SHOPPING CART</h3>
                <button className="close-button" onClick={() => setShowBasket(false)}>X</button>
            </div>
            {basket.length > 0 ? (
                <ul>
                    {basket.map((item) => (
                        <li key={item._id}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px' }} className="div">
                                <img src={item.image} alt={item.name} />
                                <div>
                                    <p>{item.title}</p>
                                    <p style={{paddingTop:'7px'}}>${item.price}</p>
                                    <div className="quantity-control">
                                        <p>
                                            <IoIosArrowBack className="arrow-icon" onClick={() => handleDecrement(item._id)} />
                                            {item.count}
                                            <IoIosArrowForward className="arrow-icon" onClick={() => handleIncrement(item._id)} />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="button">
                                <button onClick={() => handleRemove(item._id)}>
                                    <MdDeleteOutline />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your basket is empty</p>
            )}
            <div className="buttons">
                <div className="buttontitle">
                <h4>Subtotal</h4>
                <p>${subtotal.toFixed(2)}</p>
                </div>
                <p>Taxes and shipping calculated at checkout</p>
                <button style={{backgroundColor:'rgb(251,178,0)'}} onClick={() => {
                    setShowBasket(false);
                    navigate('/checkout');
                }}>CHECKOUT</button>
                <button style={{backgroundColor:'rgb(242,46,62)'}} onClick={() => {
                    setShowBasket(false);
                    navigate('/card');
                }}>VIEW CART</button>
            </div>
        </div>
    );
};

export default BasketMenu;
