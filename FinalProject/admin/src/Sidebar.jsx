import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
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
        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/logo.png" alt="" />
        </div>
        <span onClick={OpenSidebar} className='icon close-icon'>X</span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to={'/'}> <MdSpaceDashboard className='icon' />Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={'/users'}><HiMiniUsers className='icon' />Users
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={'/ourteam'}><FaUsers className='icon' />OurTeam
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={'/blogs'}><HiNewspaper className='icon' />Blogs
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={'/products'}><GiShop className='icon' />Products
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={'/reservations'}><TbAddressBook className='icon' />Reservations
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={'/orders'}><TiArrowForward className='icon' />Orders
          </Link>
        </li>


        <li className='sidebar-list-item'>
          <Link to={'/addblog'}><HiNewspaper className='icon' />Add Blog
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={'/addproduct'}><RiShoppingBag4Fill className='icon' />Add Product
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={'/addteam'}><FaUsers className='icon' />Add Team
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={'/help'}><IoHelpCircleSharp className='icon' />Help
          </Link>
        </li>

      
      </ul>
    </aside>
  )
}

export default Sidebar