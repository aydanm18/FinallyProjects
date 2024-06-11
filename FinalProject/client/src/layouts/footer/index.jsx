import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';
import { FaFacebookSquare } from "react-icons/fa";
import { FaPinterestSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";


const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true
    });
  }, []);
  return (
    <footer>
     <div className="container">
     <div data-aos="fade-down" className="row">
        <div className="col-3 col-md-6 col-sm-12 col-xs-12 footer-top">
          <h6>INFORMATION</h6>
          <ul>
            <li>Home</li>
            <li>Blog</li>
            <li>About Us</li>
            <li>Menu</li>
            <li>Menu</li>
          </ul>
        </div>
        <div className="col-3 col-md-6 col-sm-12 col-xs-12 footer-top">
          <h6>TOP ITEMS</h6>
          <ul>
            <li>Pepperoni</li>
            <li>Swiss Mushroom</li>
            <li>Barbeque Chicken</li>
            <li>Vegetarian</li>
            <li>Ham & Cheese</li>
          </ul>
        </div>
        <div className="col-3 col-md-6 col-sm-12 col-xs-12 footer-top">
          <h6>OTHERS</h6>
          <ul>
            <li>Checkout</li>
            <li>Cart</li>
            <li>Product</li>
            <li>Locations</li>
            <li>Legal</li>
          </ul>
        </div>
        <div className="col-3 col-md-6 col-sm-12 col-xs-12 footer-top">
          <h6>SOCIAL MEDIA</h6>
          <ul className='icons'>
            <li><a href="#"><FaFacebookSquare  style={{color:'rgb(59,87,157)'}}/></a></li>
            <li><a href="#"><FaPinterestSquare style={{color:'rgb(204,33,39)'}} /></a></li>
            <li><a href="#"><FaSquareTwitter style={{color:'rgb(44,170,225)'}} /></a></li>
            <li><a href="#"><FaSquareInstagram style={{color:'rgb(220,74,56)'}} />
            </a></li>
          </ul>
          <p>Signup and get exclusive offers and coupon codes</p>
          <button>Sign In</button>
        </div>
      </div>
      <div className="footer-middle">
        <div  data-aos="fade-down-right" className="middle1">
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Refund Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>
        <div data-aos="fade-down-left" className="middle2">
          <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/google-play.png" alt="" />
          <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/app-stor.png" alt="" />
        </div>
      </div>
      
     </div>
     <div  data-aos="fade-up" className="footer-end">
        <p>© 2023 Pizzon. All Rights Reserved by <a href="#">Templatescoder</a></p>
      </div>
    </footer>
  )
}

export default Footer