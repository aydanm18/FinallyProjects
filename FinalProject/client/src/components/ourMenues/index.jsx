import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';
import OurStrength from '../ourStrength';
import MenuCategories from '../ourMenu';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';


const OurMenues = () => {
 
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true
    });
    setTimeout(() => {
      setIsLoading(false); 
    }, 2300); 
  }, []);

  if (isLoading) {
    return (
      <div className="container">
       <div className="loading-spinner">
       <img
          src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/preloader.svg"
          alt="Loading..."
        />
       </div>
      </div>
    );
  }
  return (
    <>
      <Header />
      <div id='contactus'>
        <div className="container">
          <div data-aos="fade-down" style={{ paddingLeft: '50%', width: '100px' }} className="contactImg">
            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/onion.png" alt="Onion" />

          </div>
          <div className="contactus">
            <div data-aos="fade-right" className="contact-title">
              <h1>Our Menu</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div data-aos="fade-left" className="contact-links">
              <span><Link className='links' to={'/'}>Home / </Link>Our Menu</span>
            </div>
          </div>

          <div data-aos="fade-up" className="contactImg" style={{ paddingLeft: '70%', width: '100px' }}>
            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/tamato.png" alt="Tomato" />
          </div>
        </div>
      </div>
      <MenuCategories />
      <OurStrength />
      <Footer />
    </>
  );
};

export default OurMenues;
