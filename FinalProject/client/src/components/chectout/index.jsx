import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';

const Checkout = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    AOS.init({
      duration: 2300,
      once: true
    });

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
              <h1>Checkout</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div data-aos="fade-left" className="contact-links">
              <span><Link className='links' to={'/'}>Home / </Link>Checkout</span>
            </div>
          </div>

          <div data-aos="fade-up" className="contactImg" style={{ paddingLeft: '70%', width: '100px' }}>
            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/tamato.png" alt="Tomato" />
          </div>
        </div>
      </div>
      <div id='order'>
        <div className="container">
          <h3>Billing Details</h3>
          <div className="row">
            <div style={{ padding: 0 }} className="col-8 col-md-6 col-sm-12 col-xs-12">
              <form action="">
                <div className="row">
                  <div style={{ padding: 0 }} className="col-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="input">
                      <input
                        type="text"
                        name="firstname"
                        placeholder="First Name*"
                      />
                    </div>

                    <div className="input">
                      <input
                        type="text"
                        name="companyname"
                        placeholder="Company Name*"
                      />
                    </div>
                    <div className="input">
                      <input
                        type="text"
                        name="phoneno"
                        placeholder="Phone No*"
                      />
                    </div>
                    <div className="input">
                      <input
                        type="text"
                        name="streetnum"
                        placeholder="House number and street name*"
                      />
                    </div>
                    <div className="input">
                      <input
                        type="text"
                        name="zip"
                        placeholder="Postcode/Zip*"
                      />
                    </div>
                  </div>
                  <div style={{ padding: 0 }} className="col-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="input">
                      <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name*"
                      />
                    </div>

                    <div className="input">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Adress*"
                      />
                    </div>
                    <div className="input">
                      <input
                        type="text"
                        name="country"
                        placeholder="Country*"
                      />
                    </div>
                    <div className="input">
                      <input
                        type="text"
                        name="apartment"
                        placeholder="Apartment.suit,unit,etc.*"
                      />
                    </div>
                    <div className="input">
                      <input
                        type="text"
                        name="town"
                        placeholder="Town/City*"
                      />
                    </div>
                  </div>

                  <div style={{ padding: 0 }} className="col-12 col-md-12 col-sm-12 col-xs-12 col-md-6 col-sm-12 col-xs-12">
                    <h3>Additional Information</h3>
                    <div >
                      <textarea name="" id="" rows="5" placeholder="Write Message"></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div style={{ padding: 0 }} className="col-4">

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
