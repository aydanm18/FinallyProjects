import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiShoppingCart } from 'react-icons/fi'; 
import { Link } from 'react-router-dom';
import { useGetMenusQuery } from '../../services/redux/procektApi';
import './index.scss';

const MenuCategories = () => {
    const { data: menus, refetch } = useGetMenusQuery(); 
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
                    <button onClick={() => setCategory("all")} className={category === "all" ? 'active' : ''}>All</button>
                    <button onClick={() => setCategory("slides")} className={category === "slides" ? 'active' : ''}>SLIDES</button>
                    <button onClick={() => setCategory("pizzas")} className={category === "pizzas" ? 'active' : ''}>PIZZAS</button>
                    <button onClick={() => setCategory("offers")} className={category === "offers" ? 'active' : ''}>OFFERS</button>
                    <button onClick={() => setCategory("pasta")} className={category === "pasta" ? 'active' : ''}>PASTA</button>
                </div>
                <div className="cards">
                    {menus && menus.data
                        .filter((menu) => category === "all" || menu.category === category) 
                        .map((menu) => (
                            <div className="box" key={menu._id} data-aos="fade-up">
                                <Link to={`/shopdetail/${menu._id}`}>
                                    <img src={menu.image} alt={menu.title} />
                                </Link>
                                <div  className="cardTitle">
                                    <Link to={`/shopdetail/${menu._id}`}>
                                        <h3>{menu.title}</h3>
                                    </Link>
                                    <h3 style={{ color: 'rgb(242, 46, 62)' }}>${menu.price}.00</h3>
                                </div>
                                <p>{menu.description.substring(0, 63)}...</p>
                                <button>
                                    <Link to={`/shopdetail/${menu._id}`} className='links'>
                                        <FiShoppingCart fontSize={25} className='shophome' />
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
