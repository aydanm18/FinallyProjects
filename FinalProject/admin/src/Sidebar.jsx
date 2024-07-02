import React from 'react'
import { Link } from 'react-router-dom';
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { HiNewspaper } from "react-icons/hi2";
import { IoHelpCircleSharp } from "react-icons/io5";
import { GiShop } from "react-icons/gi";
import { TiArrowForward } from "react-icons/ti";
import { TbAddressBook } from "react-icons/tb";
import { BiSolidCategory } from "react-icons/bi";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { MdOutlineShoppingCart } from "react-icons/md";


const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <aside id='sidebar' className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <MdOutlineShoppingCart />SHOP
        </div>
        <span onClick={OpenSidebar} className='icon close-icon'>X</span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to={'/admin'}> <MdSpaceDashboard className='icon' />Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={'/admin/users'}><HiMiniUsers className='icon' />Users
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={'/admin/ourteam'}><FaUsers className='icon' />OurTeam
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={'/admin/blogs'}><HiNewspaper className='icon' />Blogs
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={'/admin/products'}><GiShop className='icon' />Products
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={'/admin/reservations'}><TbAddressBook className='icon' />Reservations
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={'/admin/orders'}><TiArrowForward className='icon' />Orders
          </Link>
        </li>


        <li className='sidebar-list-item'>
          <Link to={'/admin/addblog'}><HiNewspaper className='icon' />Add Blog
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={'/admin/addproduct'}><RiShoppingBag4Fill className='icon' />Add Product
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={'/admin/addteam'}><FaUsers className='icon' />Add Team
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={'/admin/help'}><IoHelpCircleSharp className='icon' />Help
          </Link>
        </li>

        <li className='dropdown-content'><FaUsers className='icon' />Setting
          <ul className='dropdown'>
            <li><Link className='link' to={'/admin/login'}>Login</Link></li>
            <li><Link className='link' to={'/admin/logout'}>Log Out</Link></li>
          </ul>
        </li>




      </ul>
    </aside>
  )
}

export default Sidebar