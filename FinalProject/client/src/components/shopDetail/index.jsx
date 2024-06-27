import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';
import Cookies from "js-cookie";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useGetByIdOneMenuQuery, usePatchByMenuMutation } from '../../services/redux/procektApi';
import { useSelector } from 'react-redux';
import PizzaSection from '../pizza';
import Swal from "sweetalert2";
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';

const ShopDetail = () => {
  const token = Cookies.get("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetByIdOneMenuQuery(id);
  const user = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const [commitPatch] = usePatchByMenuMutation();

  useEffect(() => {
    AOS.init({ duration: 1500, once: true });
  }, []);

  useEffect(() => {
    console.log('Data:', data);
    console.log('Error:', error);
    console.log('Loading:', isLoading);
  }, [data, error, isLoading]);

  const handleAddToCart = () => {
    // Implement add to cart logic here
  };

  const handleLikeToggle = async () => {
    if (!user.id) return navigate('/login');

    const updatedLikes = data?.data.likes.some((x) => x.userId === user.id)
      ? data?.data.likes.filter((x) => x.userId !== user.id)
      : [...data?.data.likes, { userId: user.id, likedAt: Date.now() }];

    try {
      const response = await commitPatch({ id: data?.data._id, payload: { likes: updatedLikes } }).unwrap();
      console.log('Response:', response);
      Swal.fire({
        title: 'Success!',
        text: 'Your like has been updated.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update like.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading-spinner">
          <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/preloader.svg" alt="Loading" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <Header />
      <div id='contactus'>
        <div className="container">
          <div data-aos="fade-down" className="contactImg" style={{ paddingLeft: '50%', width: '100px' }}>
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
                    type="number"
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
                <button onClick={handleLikeToggle}>
                  {data?.data.likes.some((x) => x.userId === user.id) ? (
                    <FavoriteIcon style={{ color: 'red' }} />
                  ) : (
                    <FavoriteBorderIcon style={{ color: 'red' }} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PizzaSection />

      <Footer />
    </>
  );
};

export default ShopDetail;
