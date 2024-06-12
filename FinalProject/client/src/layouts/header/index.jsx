import React, { useEffect, useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";

const Header = () => {
    const [scrollBg, setScrollBg] = useState(false);

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
                        <li><Link className='links' to={"/"}>HOME</Link></li>
                        <li className='dropdown-content'>SHOP
                            <ul className='dropdown'>
                                <li><Link className='link' to={'shoplist'}>SHOP LIST</Link></li>
                                <li><Link className='link' to={'card'}>CARD LIST</Link></li>
                                <li><Link className='link' to={'checkout'}>CHECKOUT</Link></li>
                            </ul>
                        </li>
                        <li className='dropdown-content'>PAGES
                            <ul className='dropdown'>
                                <li><Link className='link' to={'aboutus'}>ABOUT US</Link></li>
                                <li><Link className='link' to={'ourmenues'}>OUR MENU</Link></li>
                                <li><Link className='link' to={'ourteam'}>OUR TEAM</Link></li>
                                <li><Link className='link' to={'booknow'}>BOOKNOW</Link></li>
                                <li><Link className='link' to={'notfound'}>404 PAGE</Link></li>
                            </ul>
                        </li>
                        <li><Link className='links' to={"blog"}>BLOG</Link></li>
                        <li><Link className='links' to={"contact"}>CONTACT</Link></li>
                        <li>< IoSearchOutline fontSize={25} /></li>
                        <li><Link className='links' to={"basket"}><FiShoppingCart fontSize={25} /></Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
