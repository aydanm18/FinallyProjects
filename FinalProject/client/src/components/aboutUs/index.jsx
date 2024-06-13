import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true
    });
  }, []);

  return (
    <>
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


      <div id='OurStory'>
        <div className="container">
          <div className="row">
            <div className="col-8 col-md-6 col-sm-12 col-xs-12">
              <div className="section-heading">
                <h5>Our Story</h5>
                <h2>The Story About Pizzon</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et magna aliqua.</p>
              </div>
              <div className="row">
                <div className="col-6 col-md-6 col-sm-12 col-xs-12">
                  <div className="abt-content-inner">
                    <h4 className="">Our Family Name</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor sol incididunt ut labore et exercitation.</p>
                  </div>
                </div>
                <div className="col-6 col-md-6 col-sm-12 col-xs-12">
                  <div className="abt-content-inner">
                    <h4>Our Journey</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor sol incididunt ut labore et exercitation.</p>
                  </div>
                </div>
                <div className="col-6 col-md-6 col-sm-12 col-xs-12">
                  <div className="abt-content-inner">
                    <img src="" className="" />
                  </div>
                </div>
                <div className="col-6 col-md-6 col-sm-12 col-xs-12">
                  <div className="abt-content-inner">
                    <h4>Food and Fun</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eius exercitation.</p>
                    <img src="" alt="" />
                  </div>
                </div>
              </div>
            </div>


            <div className="col-4 col-md-6 col-sm-12 col-xs-12">
              <div>
                <img src="" className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
