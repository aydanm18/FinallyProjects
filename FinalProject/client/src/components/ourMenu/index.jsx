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
    const [query, setQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true
        });
    }, []);

    const handleSearch = (e) => {
        setQuery(e.target.value);
    }

    const handleSort = (e) => {
        setSortOrder(e.target.value);
    }

 
    const filteredMenus = menus?.data?.filter(menu =>
        (category === "all" || menu.category === category) &&
        (menu.title.toLowerCase().includes(query.toLowerCase().trim()))
    ) || [];


    if (sortOrder === 'az') {
        filteredMenus.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'za') {
        filteredMenus.sort((a, b) => b.title.localeCompare(a.title));
    }

    return (
        <div id='categories'>
            <div className="container">
                <div data-aos="fade-down" className="categories-up">
                    <button onClick={() => setCategory("all")} className={category === "all" ? 'active' : ''}>All</button>
                    <button onClick={() => setCategory("slides")} className={category === "slides" ? 'active' : ''}>SLIDES</button>
                    <button onClick={() => setCategory("pizzas")} className={category === "pizzas" ? 'active' : ''}>PIZZAS</button>
                    <button onClick={() => setCategory("offers")} className={category === "offers" ? 'active' : ''}>OFFERS</button>
                    <button onClick={() => setCategory("pasta")} className={category === "pasta" ? 'active' : ''}>PASTA</button>
                </div>
                <div data-aos="fade-down" className="div">
                    <form>
                        <input type="text" placeholder="Search" onChange={handleSearch} />
                    </form>
                    <div>
                        <h3 style={{ fontWeight: 600, paddingTop: '15px' }}>Showing all {filteredMenus.length} results</h3>
                    </div>
                    <select value={sortOrder} onChange={handleSort} name="sorting" id="sorting">
                        <option>Default Sorting</option>
                        <option value="az">A-Z</option>
                        <option value="za">Z-A</option>
                    </select>
                </div>
                <div data-aos="fade-right" className="row">
                    {filteredMenus.map(menu => (
                        <div className="col-4 col-md-6 col-sm-12 col-xs-12 box" key={menu._id} data-aos="fade-up">
                            <Link to={`/shopdetail/${menu._id}`}>
                                <img src={menu.image} alt={menu.title} />
                            </Link>
                            <div className="cardTitle">
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
