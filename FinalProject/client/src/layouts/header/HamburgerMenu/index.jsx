import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
const HamburgerMenu = ({ setToggle, toggle }) => {
    const [click, setClick] = useState(false);
    const [shopClick, setShopClick] = useState(false);
    let activeHamburger = {
        display: "block",
    };
    let activeShop = {
        display: "block",
    };
    let hamburgerMenu = {
        display: "block",
    };
    return (
        <div className="hamburger-menu" style={toggle ? hamburgerMenu : undefined}>
            <div className="hamburger-content">
                <Link style={{color:'black',fontWeight:500}}
                    className="dropdown_content"
                    to="/"
                    onClick={() => setToggle(!toggle)}
                >
                    Home
                </Link>
                <span id="pages" onClick={() => setClick(!click)}>
                    Pages
                    <ul
                        className="hamburger-pages"
                        style={click ? activeHamburger : undefined}
                    >
                        <li>
                            <Link
                                className="dropdown_content"
                                to="/aboutus"
                                onClick={() => setToggle(!toggle)}
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="dropdown_content"
                                to="/ourmenues"
                                onClick={() => setToggle(!toggle)}
                            >
                                Our Menu
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="dropdown_content"
                                to="/ourteam"
                                onClick={() => setToggle(!toggle)}
                            >
                                Our Team
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="dropdown_content"
                                to="/booknow"
                                onClick={() => setToggle(!toggle)}
                            >
                                Book Now
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="dropdown_content"
                                to="/notfound"
                                onClick={() => setToggle(!toggle)}
                            >
                                404 Page
                            </Link>
                        </li>
                    </ul>
                </span>
                <span
                    className="hamburger_link shop"
                    onClick={() => {
                        setShopClick(!shopClick);
                    }}
                >
                    Shop
                    <ul
                        className="hamburger_shop-dropdown"
                        style={shopClick ? activeShop : undefined}
                    >
                        <li>
                            <Link
                                className="dropdown_content"
                                to="/shoplist"
                                onClick={() => setToggle(!toggle)}
                            >
                                Shop List
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="dropdown_content"
                                to="/card"
                                onClick={() => setToggle(!toggle)}
                            >
                                Card List
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="dropdown_content"
                                to="/checkout"
                                onClick={() => setToggle(!toggle)}
                            >
                                Checkout
                            </Link>
                        </li>
                    </ul>
                </span>

                <Link style={{color:'black',fontWeight:500}}
                    className="dropdown_content"
                    to="/blog"
                    onClick={() => setToggle(!toggle)}
                >
                   Blog
                </Link>
                <Link style={{color:'black',fontWeight:500}}
                    className="dropdown_content"
                    to="/contact"
                    onClick={() => setToggle(!toggle)}
                >
                   Contact
                </Link>
            </div>
        </div>
    );
};

export default HamburgerMenu;