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
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Header = ({ OpenSidebar }) => {
    const [user, setUser] = useState({});
    const token = Cookies.get("token");
    const userRedux = useSelector((state) => state.admin);
    useEffect(() => {

        controller.getOne(endpoints.users, userRedux.id, token).then((res) => {
            setUser(res.data);
        });

    }, [userRedux, token]);
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
                   
                        <img  className='header-image'
                            src={user?.src}
                            alt={user?.username}
                            title={user?.username}
                        />
                    </div>
                </div>
        </header>
    )
}

export default Header