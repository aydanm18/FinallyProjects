import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { logout } from "../../../services/redux/slices/userSlice";
import Swal from "sweetalert2";

const HamburgerMenu = ({ setToggle, toggle }) => {
    const [click, setClick] = useState(false);
    const [shopClick, setShopClick] = useState(false);
    const [blogClick, setBlogClick] = useState(false);
    const [resClick, setResClick] = useState(false);
    const [accountClick, setAccountClick] = useState(false);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();


    const handlePagesClick = () => {
        setClick(!click);
    };

    const handleShopClick = () => {
        setShopClick(!shopClick);
    };

    const handleRegistrationClick = () => {
        setResClick(!resClick);
    };
    const handleBlogClick = () => {
        setBlogClick(!blogClick);
    };
    const handleAccountClick = () => {
        setAccountClick(!accountClick);
    };


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
                Cookies.remove("token");
                Swal.fire({
                    title: "Logged Out!",
                    icon: "success"
                });
            }
        });
    };

    return (
        <div className="hamburger-menu" style={toggle ? { display: "block" } : { display: "none" }}>
            <div className="hamburger-content">
                <Link
                    style={{ color: 'black', fontWeight: 500 }}
                    className="dropdown_content"
                    to="/"
                    onClick={() => setToggle(!toggle)}
                >
                    Home
                </Link>
                <span className="hamburger_link shop" onClick={handleShopClick}>
                    Shop
                    <ul className="hamburger_shop-dropdown" style={shopClick ? { display: "block" } : { display: "none" }}>
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
                <span id="pages" onClick={handlePagesClick}>
                    Pages
                    <ul className="hamburger-pages" style={click ? { display: "block" } : { display: "none" }}>
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
                <span id="blog" onClick={handleBlogClick}>
                 Blog
                    <ul className="hamburger-pages" style={blogClick ? { display: "block" } : { display: "none" }}>
                      
                        <li>
                            <Link
                                className="dropdown_content"
                                to="/blogrigth"
                                onClick={() => setToggle(!toggle)}
                            >
                               BlogRigth
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="dropdown_content"
                                to="/blogleft"
                                onClick={() => setToggle(!toggle)}
                            >
                              BlogLeft
                            </Link>
                        </li>
                    </ul>
               
                </span>
               
                <Link
                    style={{ color: 'black', fontWeight: 500 }}
                    className="dropdown_content"
                    to="/contact"
                    onClick={() => setToggle(!toggle)}
                >
                    Contact
                </Link>
                {!user.id && (
                    <span id="registration" onClick={handleRegistrationClick}>
                        Registration
                        <ul className="hamburger-regis" style={resClick ? { display: "block" } : { display: "none" }}>
                            <li>
                                <Link
                                    className="dropdown_content"
                                    to="/login"
                                    onClick={() => setToggle(!toggle)}
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown_content"
                                    to="/register"
                                    onClick={() => setToggle(!toggle)}
                                >
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </span>
                )}
                {user.id && (
                    <span id="account" onClick={handleAccountClick}>
                        Account
                        <ul className="hamburger-account" style={accountClick ? { display: "block" } : { display: "none" }}>
                            <li>
                                <Link
                                    className="dropdown_content"
                                    to="/user"
                                    onClick={() => setToggle(!toggle)}
                                    
                                >
                                    User
                                </Link> 
                                <br /> 

                                <Link
                                    className="dropdown_content"
                                    to="/mycard"
                                    onClick={() => setToggle(!toggle)}
                                >
                                   My Card
                                </Link>
                            </li>
                            <li className="dropdown_content" onClick={handleLogout}>
                                LogOut
                            </li>
                        </ul>
                    </span>
                )}
            </div>
        </div>
    );
};

export default HamburgerMenu;
