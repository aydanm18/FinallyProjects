import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiShoppingCart } from 'react-icons/fi'; // Import FiShoppingCart icon
import { Link } from 'react-router-dom';
import { useGetMenusQuery } from '../../services/redux/procektApi'; // Adjust import path if necessary
import './index.scss';

const MenuCategories = () => {
    const { data: menus, refetch } = useGetMenusQuery(); // Renamed data variable to menus
    const [category, setCategory] = useState("all");

    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true
        });
    }, []);

    return (
        <div id='categories'>
            <div className="container">
                <div className="categories-up">
                    <button onClick={() => setCategory("all")}>All</button>
                    <button onClick={() => setCategory("slides")}>SLIDES</button>
                    <button onClick={() => setCategory("pizzas")}>PIZZAS</button>
                    <button onClick={() => setCategory("offers")}>OFFERS</button>
                    <button onClick={() => setCategory("pasta")}>PASTA</button>
                </div>
                <div className="row">
                    {menus && menus.data
                        .filter((menu) => category === "all" || menu.category === category) 
                        .map((menu) => (
                            <div className="col-4 box" key={menu._id}>
                                <Link to={`shopdetail/${menu._id}`}>
                                    <img src={menu.image} alt={menu.title} />
                                </Link>
                                <div className="cardTitle">
                                    <Link to={`shopdetail/${menu._id}`}>
                                        <h3 style={{ fontWeight: 600, color: 'black' }}>{menu.title}</h3>
                                    </Link>
                                    <h3 style={{ color: 'rgb(242, 46, 62)' }}>${menu.price}.00</h3>
                                </div>
                                <p>{menu.description.substring(0, 63)}...</p>
                                <button>
                                    <Link to={`shopdetail/${menu._id}`} className='links'>
                                        <FiShoppingCart style={{ paddingTop: '7px' }} fontSize={25} className='shophome' />
                                        ORDER NOW
                                    </Link>
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default MenuCategories;
