import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';
import { BasketContext } from '../../context/basketContext';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../checkForm';
import { BASE_URL } from '../../services/api/constants';

const stripePromise = loadStripe('pk_test_51PYoRwL6alLKvkqmb2DoYlIfYYAFX5xRWINAs4bh3UiNcTwpeVgZt4rlSG1UnAU3UoTEWK5LBN5ijweDsXY3lVJv00bCn92hts');

const Checkout = () => {
  const user = useSelector((state) => state.user);
  const { basket, setBasket } = useContext(BasketContext);
  const navigate = useNavigate();
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
    paymentMethod: 'stripe',
  });

  const token = Cookies.get('token');

  useEffect(() => {
    if (!user.id) {
      navigate('/login');
    }
  }, [navigate, user]);

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
        formFields,
        userId,
        username,
        email,
        totalPrice: calculateTotal(),
        items: basket.map((item) => ({
          itemId: item._id,
          itemName: item.title,
          count: item.count,
          itemImg: item.image,
          price: item.price,
        })),
      };

      if (formFields.paymentMethod === 'stripe') {
        await makePayment(orderDetails);
        setBasket([]);
      } else {
        await placeOrder(orderDetails);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Order placed successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
      }

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
        paymentMethod: 'stripe',
      });
     

    } catch (error) {
      console.error('Error placing order:', error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error placing order!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const makePayment = async (orderDetails) => {
    setIsLoading(true);
    const stripe = await stripePromise;
    try {
      const response = await fetch(`${BASE_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderDetails),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(`Network response was not ok: ${errorData.message}`);
      }
  
      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (result.error) {
        console.error('Stripe error:', result.error);
        throw new Error(result.error.message);
      }
  
      // Clear localStorage
      localStorage.removeItem('basket');
  
      // Clear basket context
      setBasket([]);
  
      // Show success message
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Payment successful!',
        showConfirmButton: false,
        timer: 1500,
      });
  
      // Navigate to home page or any other page after successful payment
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Payment failed!',
        text: error.message || 'An unexpected error occurred.',
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  const placeOrder = async (orderDetails) => {
    try {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(`Network response was not ok: ${errorData.message}`);
      }

      const data = await response.json();
      console.log('Order placed:', data);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Order placement failed!',
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
              <p>Lorem Ipsum is simply dummy text of the printing</p>
            </div>
          </div>
        </div>
      </div>
      <section id="order">
        <div className="container">
          <form onSubmit={handleSubmit}>
              <h3>Billing Details</h3>
            <div className="row">
              <div data-aos="fade-up" className="col-4">
                <div className="form-group">
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
                  <div className="form-group">

                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      value={formFields.message}
                      onChange={handleInputChange}
                      placeholder='message'
                    />
                  </div>
                </div>

              </div>
              <div data-aos="fade-up" className="col-4">
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
              <div className="col-4 box">
             
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
                <div className="form-group">
                  <label>Payment Method:</label>
                  <select
                    className="form-control"
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formFields.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <option value="stripe">Stripe</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="total">
                <div className="subtotal">
                  <h4>Subtotal</h4>
                  <p>${calculateSubtotal().toFixed(2)}.00</p>
                </div>
                <div className="total1">
                  <h4>Total</h4>
                  <p> ${calculateTotal().toFixed(2)}.00</p>
                </div>
              </div>

                <div data-aos="fade-up" className="col-lg-12 col-md-12 col-12">
                  <div className="btn-order">
                    <button type="submit" className="btn btn-primary">
                      Place Order
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </form>
        </div >
      </section >
      <Footer />
    </>
  );
};

export default Checkout;
