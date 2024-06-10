    import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
const Header = () => {
  return (
   <header>
   <div className="container">
    <nav>
        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/logo.png" width={60} alt="" />
        <ul>
            <li><Link className='links' to={"/"}>HOME</Link></li>
            <li><Link className='links' to={"shop"}>SHOP</Link></li>
            <li><Link className='links' to={"pagees"}>PAGES</Link></li>
            <li><Link className='links' to={"blog"}>BLOG</Link></li>
            <li><Link className='links' to={"contact"}>CONTACT</Link></li>
            <li>< IoSearchOutline fontSize={25}/></li>
            <li><Link className='links' to={"basket"}><FiShoppingCart fontSize={25}/></Link></li>
        </ul>
    </nav>
   </div>
   </header>
  )
}

export default Header