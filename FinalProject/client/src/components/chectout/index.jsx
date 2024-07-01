import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';
import { BasketContext } from '../../context/basketContext';
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { useSelector } from 'react-redux';

const Checkout = () => {
  const user = useSelector((state) => state.user);
  const { basket, setBasket } = useContext(BasketContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formFields, setFormFields] = useState({
    firstname: '',
    lastname: '',
    companyname: '',
    phoneno: '',
    email: '',
    streetnum: '',
    zip: '',
    country: '',
    apartment: '',
    town: '',
    message: '',
  });

  const token = Cookies.get('token');

  useEffect(() => {
    controller.getAll(endpoints.users, token).then((res) => {
      setUsers(res.data);
    });
  }, [token]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2300);
    AOS.init({
      duration: 2300,
      once: true,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userId = user.id;
      const username = `${formFields.firstname} ${formFields.lastname}`;
      const email = formFields.email;

      if (!userId) {
        throw new Error('User ID is missing.');
      }

      const orderDetails = {
        userId,
        username,
        email,
        totalPrice: calculateTotal(),
        items: basket.map((item) => ({ itemId: item._id, itemName: item.title, count: item.count })),
      };

      const response = await controller.post(endpoints.orders, orderDetails);
      console.log(response);

      setFormFields({
        firstname: '',
        lastname: '',
        companyname: '',
        phoneno: '',
        email: '',
        streetnum: '',
        zip: '',
        country: '',
        apartment: '',
        town: '',
        message: '',
      });
      setBasket([]);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Order placed successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/'); 
    } catch (error) {
      console.error("Error placing order:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error placing order!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const calculateSubtotal = () => {
    return basket.reduce((total, item) => total + item.price * item.count, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

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
      <div id="contactus">
        <div className="container">
          <div
            data-aos="fade-down"
            style={{ paddingLeft: '50%', width: '100px' }}
            className="contactImg"
          >
            <img
              src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/onion.png"
              alt="Onion"
            />
          </div>
          <div className="contactus">
            <div data-aos="fade-right" className="contact-title">
              <h1>Checkout</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div data-aos="fade-left" className="contact-links">
              <span>
                <Link className="links" to={'/'}>
                  Home /{' '}
                </Link>
                Checkout
              </span>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="contactImg"
            style={{ paddingLeft: '70%', width: '100px' }}
          >
            <img
              src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/tamato.png"
              alt="Tomato"
            />
          </div>
        </div>
      </div>
      <div id="order">
        <div className="container">
          <h3>Billing Details</h3>
          <div className="row">
            <div style={{ padding: 0 }} className="col-8 col-md-6 col-sm-12 col-xs-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div style={{ padding: 0 }} className="col-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="input">
                      <input
                        type="text"
                        name="firstname"
                        value={formFields.firstname}
                        onChange={handleInputChange}
                        placeholder="First Name*"
                        required
                      />
                    </div>
                    <div className="input">
                      <input
                        type="text"
                        name="companyname"
                        value={formFields.companyname}
                        onChange={handleInputChange}
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="input">
                      <input
                        type="tel"
                        name="phoneno"
                        value={formFields.phoneno}
                        onChange={handleInputChange}
                        placeholder="Phone No*"
                        required
                      />
                    </div>
                    <div className="input">
                      <input
                        type="text"
                        name="streetnum"
                        value={formFields.streetnum}
                        onChange={handleInputChange}
                        placeholder="House number and street name*"
                        required
                      />
                    </div>
                    <div className="input">
                      <input
                        type="text"
                        name="zip"
                        value={formFields.zip}
                        onChange={handleInputChange}
                        placeholder="Postcode/Zip*"
                        required
                      />
                    </div>
                  </div>
                  <div style={{ padding: 0 }} className="col-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="input">
                      <input
                        type="text"
                        name="lastname"
                        value={formFields.lastname}
                        onChange={handleInputChange}
                        placeholder="Last Name*"
                        required
                      />
                    </div>
                    <div className="input">
                      <input
                        type="email"
                        name="email"
                        value={formFields.email}
                        onChange={handleInputChange}
                        placeholder="Email Address*"
                        required
                      />
                    </div>
                    <div className="input">
                      <input
                        type="text"
                        name="country"
                        value={formFields.country}
                        onChange={handleInputChange}
                        placeholder="Country*"
                        required
                      />
                    </div>
                    <div className="input">
                      <input
                        type="text"
                        name="apartment"
                        value={formFields.apartment}
                        onChange={handleInputChange}
                        placeholder="Apartment, suit, unit, etc."
                      />
                    </div>
                    <div className="input">
                      <input
                        type="text"
                        name="town"
                        value={formFields.town}
                        onChange={handleInputChange}
                        placeholder="Town/City*"
                        required
                      />
                    </div>
                  </div>
                  <div style={{ padding: 0 }} className="col-12">
                    <h3>Additional Information</h3>
                    <textarea
                      name="message"
                      rows="5"
                      value={formFields.message}
                      onChange={handleInputChange}
                      placeholder="Write Message"
                    ></textarea>
                  </div>

                  <div style={{ padding: 0 }} className="col-12">
                    <button type="submit">Submit</button>
                  </div>
                </div>
              </form>
            </div>
            <div style={{ padding: 0 }} className="col-4 col-md-6 col-sm-12 col-xs-12 box">
              <h3>Your Order</h3>
              {basket.length > 0 ? (
                basket.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="image">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="title">
                      <h4>{item.title}</h4>
                      <p>${item.price}.00 x {item.count}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>Your basket is empty.</p>
              )}
              <div className="total">
                <div className="subtotal">
                  <h4>Subtotal</h4>
                  <p>${calculateSubtotal()}.00</p>
                </div>
                <div className="total1">
                  <h4>Total</h4>
                  <p>${calculateTotal()}.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
