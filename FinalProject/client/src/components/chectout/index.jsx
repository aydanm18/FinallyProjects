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
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51PYoRwL6alLKvkqmb2DoYlIfYYAFX5xRWINAs4bh3UiNcTwpeVgZt4rlSG1UnAU3UoTEWK5LBN5ijweDsXY3lVJv00bCn92hts');

const CheckoutForm = ({ handleSubmit }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <div className="checkoutBtn">
        <button type="submit" disabled={!stripe || loading}>
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const { basket, setBasket } = useContext(BasketContext);
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
    AOS.init({ duration: 1000 });  // Initialize AOS animation library
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isFormComplete = () => {
    const requiredFields = [
      'firstname', 'lastname', 'phoneno', 'email', 'streetnum',
      'zip', 'country', 'town', 'message'
    ];
    return requiredFields.every(field => formFields[field]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormComplete()) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Please fill all required fields!',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/create-payment-intent', { amount: calculateTotal() * 100 });
      const { clientSecret } = response.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Payment failed!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          const userId = user.id;
          const username = `${formFields.firstname} ${formFields.lastname}`;
          const email = formFields.email;

          const orderDetails = {
            formFields,
            userId,
            username,
            email,
            totalPrice: calculateTotal(),
            items: basket.map((item) => ({ itemId: item._id, itemName: item.title, count: item.count, itemImg: item.image })),
          };

          await axios.post('http://localhost:8080/create-order', orderDetails);

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
            position: 'top-end',
            icon: 'success',
            title: 'Order placed successfully!',
            showConfirmButton: false,
            timer: 1500,
          });

          navigate('/');
        }
      }
    } catch (error) {
      setError(error.message);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error placing order!',
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotal = () => {
    return basket.reduce((total, item) => total + item.price * item.count, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.1;  // Assume a 10% tax rate
    return subtotal + tax;
  };

  return (
    <>
      <Header />
      <div id="contactus">
        <div className="container">
          <div
            data-aos="fade-down"
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
            <div className="col-8 col-md-6 col-sm-12 col-xs-12">
              <Elements stripe={stripePromise}>
                <CheckoutForm handleSubmit={handleSubmit} />
              </Elements>
              <div className="row">
                <div className="col-6 col-md-6 col-sm-12 col-xs-12">
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
                <div className="col-6 col-md-6 col-sm-12 col-xs-12">
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
                      name="apartment"
                      value={formFields.apartment}
                      onChange={handleInputChange}
                      placeholder="Apartment, suite, unit etc."
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
                <div className="textarea">
                  <textarea
                    cols="30"
                    rows="5"
                    name="message"
                    value={formFields.message}
                    onChange={handleInputChange}
                    placeholder="Order notes (optional)"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="col-4 col-md-6 col-sm-12 col-xs-12">
              <div className="orders">
                <h4>Your Order</h4>
                <ul>
                  {basket.map((item) => (
                    <li key={item._id}>
                      {item.title} x {item.count} <span>${item.price * item.count}</span>
                    </li>
                  ))}
                </ul>
                <div className="order-total">
                  <p>Subtotal <span>${calculateSubtotal().toFixed(2)}</span></p>
                  <p>Tax (10%) <span>${(calculateSubtotal() * 0.1).toFixed(2)}</span></p>
                  <p>Total <span>${calculateTotal().toFixed(2)}</span></p>
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
  