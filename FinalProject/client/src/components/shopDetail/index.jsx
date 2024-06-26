import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';
import Cookies from "js-cookie";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useGetByIdOneMenuQuery } from '../../services/redux/procektApi';
import { useSelector } from 'react-redux';
import PizzaSection from '../pizza';
import { FavContext } from '../../context/favContext';
import { BasketContext } from '../../context/basketContext';
import Rating from '@mui/material/Rating';

const ShopDetail = () => {
  const token = Cookies.get("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetByIdOneMenuQuery(id);
  const user = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const { fav, setFav } = useContext(FavContext);
  const { basket, setBasket } = useContext(BasketContext);
  const [commit, setCommit] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true
    });

  }, []);

  const handleFavoriteClick = () => {
    if (!user || !user.id) return;

    const found = fav.find((x) => x.userId === user.id && x.pizzaId === id);
    const updatedFav = found ? fav.filter((x) => x.userId !== user.id || x.pizzaId !== id) : [...fav, { userId: user.id, pizzaId: id }];

    setFav(updatedFav);
    localStorage.setItem('fav', JSON.stringify(updatedFav));
  };

  const handleAddToCart = () => {
    const duplicateBasket = basket.find((x) => x._id === data?.data._id);
    if (duplicateBasket) {
      duplicateBasket.count += quantity;
      setBasket([...basket]);
      localStorage.setItem('basket', JSON.stringify([...basket]));
    } else {
      const newBasket = { ...data?.data, count: quantity };
      setBasket([...basket, newBasket]);
      localStorage.setItem('basket', JSON.stringify([...basket, newBasket]));
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <div id='contactus'>
        <div className="container">
          <div data-aos="fade-down" style={{ paddingLeft: '50%', width: '100px' }} className="contactImg">
            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/onion.png" alt="Onion" />
          </div>
          <div className="contactus">
            <div data-aos="fade-right" className="contact-title">
              <h1>Shop Detail</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div data-aos="fade-left" className="contact-links">
              <span><Link className='links' to={'/'}>Home / </Link>Shop Detail</span>
            </div>
          </div>
          <div data-aos="fade-up" className="contactImg" style={{ paddingLeft: '70%', width: '100px' }}>
            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/tamato.png" alt="Tomato" />
          </div>
        </div>
      </div>

      <div id='detailSection'>
        <div className="container">
          <div className="row">
            <div className="col-6 col-md-12 col-sm-12 col-xs-12 box1">
              <img src={data?.data.image} alt={data?.data.title} />
            </div>
            <div className="col-6 col-md-12 col-sm-12 col-xs-12 box2">
              <h1>{data?.data.title}</h1>
              <h3 style={{ color: 'rgb(242,46,62)' }}>${data?.data.price}.00</h3>
              <p>{data?.data.description}</p>
              <div className="detail-down">
                <div className="buttons">
                  <input
                    type="number  "
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    min={1}
                  />

                  {token ? (
                    <button onClick={handleAddToCart}>
                      <Link className='links' to={'/basket'}>ADD TO CART</Link>
                    </button>
                  ) : (
                    <button onClick={() => navigate('/login')}>
                      ADD TO CART
                    </button>
                  )}
                </div>
                {token ? (
                  <button onClick={handleFavoriteClick}>
                    {fav.find((x) => x.userId === user.id && x.pizzaId === id) ? (
                      <FavoriteIcon style={{ color: 'red' }} />
                    ) : (
                      <FavoriteBorderIcon style={{ color: 'red' }} />
                    )}
                  </button>
                ) : (
                  <button onClick={() => navigate('/login')}>
                    <FavoriteBorderIcon style={{ color: 'red' }} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <PizzaSection />

      <div id='review'>
        <div className="container">
          <h3>Review</h3>
          <p>There are no reviews yet.</p>
          <h5>Be the first to review “Shrimp Pizza”</h5>
          <p>Your email address will not be published. Required fields are marked *</p>
          <p>Your Rating <Rating name="no-value" value={null} /></p>
        </div>
        <form action="">
          <div className="row">
            <div className="col-12 col-md-12 col-sm-12">
              <div >
                <textarea required name="" id="" rows="6" placeholder="Your Message"></textarea>
              </div>
            </div>
          </div>
          <div style={{ padding: 0 }} className="col-12 col-md-12 col-sm-12 col-xs-12">
            <div className="com_button">
              <button type="submit">Post Comment</button>
            </div>
          </div>
        </form>
      </div >
    </>
  );
};

export default ShopDetail;
