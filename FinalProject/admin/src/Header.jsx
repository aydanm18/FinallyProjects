import React from 'react'
import { BsFillBellFill } from "react-icons/bs";
import { FaAlignJustify } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { BsFillEnvelopeFill } from "react-icons/bs";


const Header = ({ OpenSidebar }) => {
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
                        <BsFillBellFill className='icon' />
                        <BsFillEnvelopeFill className='icon' />
                        <BsPersonCircle className='icon' />
                    </div>
                </div>
        </header>
    )
}

export default Header