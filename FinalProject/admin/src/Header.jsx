import React from 'react'
import { BsFillBellFill } from "react-icons/bs";
import { FaAlignJustify } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { BsFillEnvelopeFill } from "react-icons/bs";
import Cookies from 'js-cookie';
import { useState } from 'react';
import controller from './services/api/requests';
import { endpoints } from './services/api/constants';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FaUsers } from "react-icons/fa";
import { logout } from '../../admin/src/services/redux/slices/userSlice';

import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
const Header = ({ OpenSidebar }) => {
    const userRedux = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [user, setUser] = useState({});
    const token = Cookies.get("token");

    useEffect(() => {
        controller.getOne(endpoints.users, userRedux.id, token).then((res) => {
            setUser(res.data);
        });

    }, [userRedux, token]);
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
            }
        });
        navigate('/login')
    };
    return (
        <header>
            <div className="header">
                <div className="menu-icon">
                    <FaAlignJustify className='icon' onClick={OpenSidebar} />
                </div>
                <div className="header-left">
                    <BsSearch className='icon' />
                </div>
                <div className="header-rigth">

                    <img className='header-image'
                        src={user?.src}
                        alt={user?.username}

                    />

                    <li className='dropdown-content'>Admin : {user?.username}
                        <ul className='dropdown'>


                            <li style={{ color: 'red' }} onClick={handleLogout} >LogOut</li>


                        </ul>
                    </li>
                </div>
            </div>
        </header>
    )
}

export default Header