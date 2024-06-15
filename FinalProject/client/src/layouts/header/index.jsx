import React, { useEffect, useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import HamburgerMenu from './HamburgerMenu';

const Header = () => {
    const [scrollBg, setScrollBg] = useState(false);
    const [toggle, setToggle] = useState(false);

    const listenScrollEvent = () => {
        window.scrollY > 30 ? setScrollBg(true) : setScrollBg(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, []);

    return (
        <header className={scrollBg ? 'scrolled' : ''}>
            <div className="container">
                <nav>
                    <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/logo.png" width={60} alt="Logo" />
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
                        <li><Link className='links' to={"/blog"}>Blog</Link></li>
                        <li><Link className='links' to={"/contact"}>Contact</Link></li>
                        <li className='dropdown-content'>Registration
                            <ul className='dropdown'>
                                <li><Link className='link' to={'/login'}>Login</Link></li>
                                <li><Link className='link' to={'/register'}>Register</Link></li>

                            </ul>
                        </li>
                        <li><Link className='links' to={"basket"}><FiShoppingCart fontSize={25} /></Link></li>
                    </ul>
                </nav>
                <div className="nav-hamburger" onClick={() => setToggle(!toggle)}>
                    <RxHamburgerMenu />
                </div>
                <HamburgerMenu setToggle={setToggle} toggle={toggle} />
            </div>
        </header>
    );
}

export default Header;
