import React, { useEffect, useState, useContext } from 'react';
import './index.scss';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import HamburgerMenu from './HamburgerMenu';
import BasketMenu from './BasketMenu';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { logout } from '../../services/redux/slices/userSlice';
import Cookies from "js-cookie";
import { BasketContext } from '../../context/basketContext';

const Header = () => {
    const [scrollBg, setScrollBg] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [showBasket, setShowBasket] = useState(false);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { basket,setBasket } = useContext(BasketContext);
    const navigate = useNavigate();
    const location = useLocation();

    const listenScrollEvent = () => {
        window.scrollY > 30 ? setScrollBg(true) : setScrollBg(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, []);
    useEffect(() => {
        if (!user.id) {
            setBasket([]);
            localStorage.setItem('basket', JSON.stringify([]));
        }
    }, [user.id, setBasket]);
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logout());
                Cookies.remove('token');

                Swal.fire({
                    title: "Logged Out!",
                    icon: "success"
                });
                navigate('/');
            }
        });
    };


    const isActiveShop = location.pathname.includes('/shoplist') ||
        location.pathname.includes('/card') ||
        location.pathname.includes('/checkout');


    const isActivePages = location.pathname.includes('/aboutus') ||
        location.pathname.includes('/ourmenues') ||
        location.pathname.includes('/ourteam') ||
        location.pathname.includes('/booknow') ||
        location.pathname.includes('/notfound');


    const isActiveBlog = location.pathname.includes('/blogrigth') ||
        location.pathname.includes('/blogleft');
    const isActiveAccound = location.pathname.includes('/user') 

    const isActiveRegister = location.pathname.includes('/login') ||
        location.pathname.includes('/regsiter')



    return (
        <header className={scrollBg ? 'scrolled' : ''}>
            <div className="container">
                <nav>
                    <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/logo.png" width={60} alt="Logo" />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", gap: '15px' }} className="div">
                        <ul>
                            <li><NavLink className='links' to="/" activeClassName="active">HOME</NavLink></li>
                            <li className={`dropdown-content ${isActiveShop ? 'active' : ''}`}>
                                SHOP
                                <ul className='dropdown'>
                                    <li><NavLink className='link' to="/shoplist" >ShopList</NavLink></li>
                                    <li><NavLink className='link' to="/card" >CardList</NavLink></li>
                                    <li><NavLink className='link' to="/checkout" >Checkout</NavLink></li>
                                </ul>
                            </li>
                            <li className={`dropdown-content ${isActivePages ? 'active' : ''}`}>
                                PAGES
                                <ul className='dropdown'>
                                    <li><NavLink className='link' to="/aboutus" activeClassName="active">AboutUs</NavLink></li>
                                    <li><NavLink className='link' to="/ourmenues" activeClassName="active">OurMenu</NavLink></li>
                                    <li><NavLink className='link' to="/ourteam" activeClassName="active">OurTeam</NavLink></li>
                                    <li><NavLink className='link' to="/booknow" activeClassName="active">BookNow</NavLink></li>
                                    <li><NavLink className='link' to="/notfound" activeClassName="active">404Page</NavLink></li>
                                </ul>
                            </li>
                            <li className={`dropdown-content ${isActiveBlog ? 'active' : ''}`}>
                                BLOG
                                <ul className='dropdown'>
                                    <li><NavLink className='link' to="/blogrigth" activeClassName="active">BlogRight</NavLink></li>
                                    <li><NavLink className='link' to="/blogleft" activeClassName="active">BlogLeft</NavLink></li>
                                </ul>
                            </li>
                            <li><NavLink className='links' to="/contact" activeClassName="active">CONTACT</NavLink></li>
                            {!user.id && (
                                <li className={`dropdown-content ${isActiveRegister ? 'active' : ''}`}>
                                    REGISTRATION
                                    <ul className='dropdown'>
                                        <li><NavLink className='link' to="/login" activeClassName="active">Login</NavLink></li>
                                        <li><NavLink className='link' to="/register" activeClassName="active">Register</NavLink></li>
                                    </ul>
                                </li>
                            )}
                            {user.id && (
                                <li className={`dropdown-content ${isActiveAccound ? 'active' : ''}`}>
                                    ACCOUNT
                                    <ul className='dropdown'>
                                        <li><NavLink className='link' to="/user" activeClassName="active">User</NavLink></li>

                                        <li onClick={handleLogout}>LogOut</li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                        <div style={{ display: 'flex', justifyContent: "center", gap: '10px' }} className="responsiv">
                            <div className="basket">
                                <button onClick={() => setShowBasket(!showBasket)} 
                               
                                 className='links'>
                                    <FiShoppingCart style={{ fontSize: '20px', color: 'black' }} />
                                    <sub>{basket.length}</sub>
                                </button>
                            </div>
                            <div className="nav-hamburger" onClick={() => setToggle(!toggle)}>
                                <RxHamburgerMenu />
                            </div>
                        </div>
                    </div>
                </nav>
                <HamburgerMenu setToggle={setToggle} toggle={toggle} />
                <BasketMenu setShowBasket={setShowBasket} basket={basket} showBasket={showBasket} />
            </div>
        </header>
    );
}

export default Header;
