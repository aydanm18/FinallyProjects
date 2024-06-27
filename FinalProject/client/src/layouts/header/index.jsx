import React, { useEffect, useState, useContext } from 'react';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import HamburgerMenu from './HamburgerMenu';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { logout } from '../../services/redux/slices/userSlice';
import Cookies from "js-cookie";
import { BasketContext } from '../../context/basketContext';

const Header = () => {
    const [scrollBg, setScrollBg] = useState(false);
    const [toggle, setToggle] = useState(false);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { basket, clearBasket } = useContext(BasketContext);
    const navigate=useNavigate()

    const listenScrollEvent = () => {
        window.scrollY > 30 ? setScrollBg(true) : setScrollBg(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, []);

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
                clearBasket(); 
                Swal.fire({
                    title: "Logged Out!",
                    icon: "success"
                });
            }
        });
        navigate('/')
    };

    return (
        <header className={scrollBg ? 'scrolled' : ''}>
            <div className="container">
                <nav>
                    <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/logo.png" width={60} alt="Logo" />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", gap: '15px' }} className="div">
                        <ul>
                            <li><Link className='links' to={"/"}>Home</Link></li>
                            <li className='dropdown-content'>Shop
                                <ul className='dropdown'>
                                    <li><Link className='link' to={'/shoplist'}>Shop List</Link></li>
                                    <li><Link className='link' to={'/card'}>Card List</Link></li>
                                    <li><Link className='link' to={'/checkout'}>Checkout</Link></li>
                                </ul>
                            </li>
                            <li className='dropdown-content'>Pages
                                <ul className='dropdown'>
                                    <li><Link className='link' to={'/aboutus'}>AboutUs</Link></li>
                                    <li><Link className='link' to={'/ourmenues'}>OurMenu</Link></li>
                                    <li><Link className='link' to={'/ourteam'}>OurTeam</Link></li>
                                    <li><Link className='link' to={'/booknow'}>BookNow</Link></li>
                                    <li><Link className='link' to={'/notfound'}>404Page</Link></li>
                                </ul>
                            </li>
                            <li className='dropdown-content'>Blog
                                <ul className='dropdown'>
                                    <li><Link className='link' to={'/blogrigth'}>BlogRigth</Link></li>
                                    <li><Link className='link' to={'/blogleft'}>BlogLeft</Link></li>
       
                                </ul>
                            </li>
   
                            <li><Link className='links' to={"/contact"}>Contact</Link></li>
                            {!user.id && (
                                <li className='dropdown-content'>Registration
                                    <ul className='dropdown'>
                                        <li><Link className='link' to={'/login'}>Login</Link></li>
                                        <li><Link className='link' to={'/register'}>Register</Link></li>
                                    </ul>
                                </li>
                            )}
                            {user.id && (
                                <li className='dropdown-content'>Account
                                    <ul className='dropdown'>
                                        <li><Link className='link' to={'/user'}>User</Link></li>
                                        <li onClick={handleLogout}>LogOut</li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                        <div style={{ display: 'flex', justifyContent: "center", gap: '10px' }} className="responsiv">
                            <div className="basket">
                                <Link className='links' to={"basket"}>
                                    <FiShoppingCart style={{ fontSize: '20px', color: 'black' }} />
                                    <sub>{user.id ? basket.length : 0}</sub>
                                </Link>
                            </div>
                            <div className="nav-hamburger" onClick={() => setToggle(!toggle)}>
                                <RxHamburgerMenu />
                            </div>
                        </div>
                    </div>
                </nav>
                <HamburgerMenu setToggle={setToggle} toggle={toggle} />
            </div>
        </header>
    );
}

export default Header;
