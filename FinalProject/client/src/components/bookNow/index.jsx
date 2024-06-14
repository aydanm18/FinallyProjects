import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';
import Iframe from '../iframe';

const BookNow = () => {
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
              <h1>Book A Table</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div data-aos="fade-left" className="contact-links">
              <span><Link className='links' to={'/'}>Home / </Link>Book A Table</span>
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
            <div className="col-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 ourStory_title">
              <div data-aos="fade-right" className="title">
                <div className="xet">
                  <h5>Reserve Your Seat</h5>
                  <div></div>
                </div>
                <h2>Call Us Or Visit Place</h2>
                <p>Lorem ipsum dolor sit amet,colur consectetur omni adipisicing elit, sed do eiusmod tempor incididunt labore et magna aliqua.</p>
              </div>
              <div data-aos="fade-up" className="row">
                <div className="col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 ourStory-content">
                  <h4>Torre Annunziata</h4>
                  <p>1614 E. Bell Rd #104.
                    Salerno, AZ 85022
                    (989) 867-1010
                    Open today 11AM-10PM0</p>
                </div>
                <div className="col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 ourStory-content">
                  <h4>Posillipo</h4>
                  <p>204 E. Pizzetta Tommaso
                    Sorrento, AZ 85022
                    (989) 867-1010
                    Open today 11AM-10PM0</p>
                </div>
                <div className="col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 ourStory-content">
                  <h4>Torre del Greco</h4>
                  <p>Vale Puglia 54
                    Torre Del Greco AZ 85022
                    (989) 867-1010
                    Open today 11AM-10PM0</p>
                </div>
                <div className="col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 ourStory-content">
                  <h4>Naples Mercato</h4>
                  <p>Corso Itali AA
                    Naples, AZ 85022
                    (989) 867-1010
                    Open today 11AM-10PM0.</p>

                </div>
              </div>
            </div>
            <div data-aos="fade-down" className="col-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <div className='image-rigth'>
                <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/reserve-img.jpg" className="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Iframe />

      <div id='reservation'>
        <div className="container">

          <div className="row">
            <div className="col-6 col-md-6 col-sm-12 col-xs-12 images">
              <div  data-aos="fade-down" className="res_image">
                <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/book-img.jpg" />
              </div>

            </div>
            <div data-aos="fade-up" className="col-6 col-md-6 col-sm-12 col-xs-12 forms">

              <form>
                <div className="res_title">
                  <div className="xet">
                    <h5>Reservation</h5>
                    <div></div>
                  </div>
                  <h2 style={{marginBottom:0}}>Book A Table Now!</h2>
                </div>
                <div className="row">

                  <div style={{padding:0}} className="col-6 col-md-6 col-sm-12 col-xs-12">

                    <div className="input">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name*"
                      />
                    </div>


                    <div className="input">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone*"
                      />
                    </div>


                    <div className="input">
                      <input
                        type="text"
                        name="date"
                        placeholder='Date*'
                      />
                    </div>
                  </div>
                  <div style={{padding:0}} className="col-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="input">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email*"
                      />
                    </div>

                    <div className="input">
                      <input
                        type="text"
                        name="time"
                        placeholder='Time*'
                      />
                    </div>

                    <div className="input">
                      <input
                        type="number"
                        name="guest"
                        placeholder="Guest*"
                      />
                    </div>
                  </div>
                </div>

                <div style={{padding:0}} className="col-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="res_button">
                    <button type="submit">BOOK NOW</button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default BookNow;
