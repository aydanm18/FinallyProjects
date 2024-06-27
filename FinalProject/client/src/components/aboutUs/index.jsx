import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';
import OurStrength from '../ourStrength';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';

const AboutUs = () => {
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true
    });
  }, []);

  useEffect(() => {
 
    setTimeout(() => {
      setIsLoading(false); 
    }, 2000); 
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
              <h1>About Us</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div data-aos="fade-left" className="contact-links">
              <span><Link className='links' to={'/'}>Home / </Link>About Us</span>
            </div>
          </div>

          <div data-aos="fade-up" className="contactImg" style={{ paddingLeft: '70%', width: '100px' }}>
            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/tamato.png" alt="Tomato" />
          </div>
        </div>
      </div>


      <div id='ourStory'>
        <div className="container">
          <div className="row">
            <div  className="col-8 col-lg-8 col-md-12 col-sm-12 col-xs-12 ourStory_title">
             <div data-aos="fade-right" className="title">
             <div className="xet">
                <h5>Our Story</h5>
                <div></div>
              </div>
              <h2>The Story About Pizzon</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et magna aliqua.</p>
             </div>
              <div  data-aos="fade-up" className="row">
                <div className="col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 ourStory-content">
                  <h4>Our Family Name</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor sol incididunt ut labore et exercitation.</p>
                </div>
                <div className="col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 ourStory-content">
                  <h4>Our Journey</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor sol incididunt ut labore et exercitation.</p>
                </div>
                <div className="col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 ourStory-content">
                  <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/abt-img-1.jpg" className="" />
                </div>
                <div className="col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 ourStory-content">
                  <h4>Food and Fun</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eius exercitation.</p>
                 <div className="logo">
                 <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/abt-logo.png" alt="" />
                 </div>
                </div>
              </div>
            </div>
            <div  data-aos="fade-down" className="col-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
              <div className='img-rigth'>
                <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/abt-img-2.jpg" className="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <OurStrength/>
      <Footer />
    </>
  );
};

export default AboutUs;
