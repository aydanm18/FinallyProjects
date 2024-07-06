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
    paymentMethod: 'stripe',
  });

  const token = Cookies.get('token');

  useEffect(() => {
    if (!user.id) {
      navigate('/login');
    }
  }, [navigate, user]);

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
        })),
      };
      console.log(orderDetails);
      
      if (formFields.paymentMethod === 'stripe') {
        await makePayment();
      } else {
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
      setBasket([]);

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

  const makePayment = async () => {
    setIsLoading(true);
    const stripe = await stripePromise;
    try {
      const response = await fetch(`${BASE_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ menues: basket }),
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
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Payment failed!',
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
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
                        placeholder="Postcode/ZIP"
                      />
                    </div>
                    <div className="input">
                      <input
                        type="text"
                        name="apartment"
                        value={formFields.apartment}
                        onChange={handleInputChange}
                        placeholder="Apartment, Suite, Unit, etc."
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
                        placeholder="Email*"
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
                        name="town"
                        value={formFields.town}
                        onChange={handleInputChange}
                        placeholder="Town/City*"
                        required
                      />
                    </div>
                    <div className="input">
                      <textarea
                        name="message"
                        value={formFields.message}
                        onChange={handleInputChange}
                        placeholder="Order notes"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="order-payment">
                      <h3>Your Order</h3>
                      <table className="order-table">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {basket.map((item) => (
                            <tr key={item._id}>
                              <td>
                                {item.title} <strong>x {item.count}</strong>
                              </td>
                              <td>${item.price * item.count}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th>Subtotal</th>
                            <td>${calculateSubtotal()}</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>${calculateTotal()}</td>
                          </tr>
                        </tfoot>
                      </table>
                      <div className="payment-options">
                        <label>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="stripe"
                            checked={formFields.paymentMethod === 'stripe'}
                            onChange={handleInputChange}
                          />
                          Stripe
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cash"
                            checked={formFields.paymentMethod === 'cash'}
                            onChange={handleInputChange}
                          />
                          Cash on Delivery
                        </label>
                      </div>
                      {formFields.paymentMethod === 'stripe' && (
                        <Elements stripe={stripePromise}>
                          <CheckoutForm />
                        </Elements>
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
