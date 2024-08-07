import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';
import Cookies from "js-cookie";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDeleteByIdMenuMutation, useGetByIdOneMenuQuery, usePatchByMenuMutation } from '../../services/redux/procektApi';
import { useSelector } from 'react-redux';
import PizzaSection from '../pizza';
import Swal from "sweetalert2";
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';
import Rating from '@mui/material/Rating';
import { endpoints } from '../../services/api/constants';
import controller from '../../services/api/requests';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Button from "@mui/material/Button";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import { BasketContext } from '../../context/basketContext';

const ShopDetail = () => {
  const [users, setUsers] = useState([]);
  const [ratingValue, setRatingValue] = useState(null);
  const token = Cookies.get("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading, refetch } = useGetByIdOneMenuQuery(id);
  const user = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const [commitPatch] = usePatchByMenuMutation();
  const [pizzaCommit, setPizzaCommit] = useState('');
  const [comments, setComments] = useState([]);
  const numberOfReviews = comments.length;
  const { basket, setBasket } = useContext(BasketContext);
  useEffect(() => {
    AOS.init({ duration: 1500, once: true });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    controller.getAll(endpoints.users, token).then((res) => {
      setUsers(res.data);
    });
  }, [token]);

  useEffect(() => {
    if (data?.data.comments && users) {
      const updatedComments = data?.data.comments.map(comment => {
        const currentUser = users.find(user => user._id === comment.userId);
        return {
          ...comment,
          user: currentUser,
        };
      });
      setComments(updatedComments);
    }
  }, [data?.data.comments, users]);

  const handleAddToCart = () => {
    if (!user.id) return navigate('/login');

    const duplicateBasket = basket.find((x) => x._id === data?.data._id);
    if (duplicateBasket) {
      duplicateBasket.count += quantity;
      setBasket([...basket]);
      localStorage.setItem('basket', JSON.stringify([...basket]));
    } else {
      const newBasket = { ...data?.data, count: quantity };
      setBasket([...basket, newBasket]);
      localStorage.setItem('basket', JSON.stringify([...basket, newBasket]));

    };

    Swal.fire({
      title: 'Added to cart!',
      text: `${quantity} item(s) have been added to your cart.`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  const handleLikeToggle = async () => {
    if (!user.id) return navigate('/login');
    const updatedLikes = data?.data.likes.some((x) => x.userId === user.id)
      ? data?.data.likes.filter((x) => x.userId !== user.id)
      : [...data?.data.likes, { userId: user.id, likedAt: Date.now() }];

    try {
      const response = await commitPatch({ id: data?.data._id, payload: { likes: updatedLikes } }).unwrap();
      console.log('Response:', response);
      refetch()
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

  const handleSubmitComment = async (e) => {
    if (!user.id) return navigate('/login');
    e.preventDefault();
    if (!pizzaCommit || !ratingValue) {
      Swal.fire({
        title: 'Error!',
        text: 'Please provide both a comment and a rating.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const newComment = {
      content: pizzaCommit,
      userId: user.id,
      rating: ratingValue,
      createdAt: new Date(),
    };

    try {
      const updatedComments = [...comments, newComment];
      await commitPatch({ id, payload: { comments: updatedComments } }).unwrap();
      setComments(updatedComments);
      setPizzaCommit('');
      setRatingValue(null);
      refetch()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Comment posted",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to post comment.',
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
              <h1>Shop Detail</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div className="contact-links">
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
            <div data-aos="flip-left" className="col-6 col-md-12 col-sm-12 col-xs-12 box1">
              <img src={data?.data.image} alt={data?.data.title} />
            </div>
            <div data-aos="flip-down" className="col-6 col-md-12 col-sm-12 col-xs-12 box2">
              <h1>{data?.data.title}</h1>
              <h3 style={{ color: 'rgb(242,46,62)' }}>${data?.data.price}.00</h3>
              <p>{data?.data.description}</p>
              <p>{numberOfReviews} {numberOfReviews === 1 ? 'Review' : 'Reviews'}</p>
              <p>Category: {data?.data.category}</p>
              <div className="detail-down">
                <div className="buttons">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min={1}
                  />
                  <button onClick={handleAddToCart}>
                    <Link className='links' to={'/card'}>ADD TO CART</Link>
                  </button>
                </div>
                <button onClick={handleLikeToggle}>
                  {data?.data.likes.some((x) => x.userId === user.id) ? (
                    <>
                      <FavoriteIcon style={{ color: 'red' }} />
                      <span className="likes-count">{data?.data.likes.length}</span>
                    </>
                  ) : (
                    <>
                      <FavoriteBorderIcon style={{ color: 'red' }} />
                      <span className="likes-count">{data?.data.likes.length}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PizzaSection />

      <div data-aos="fade-left" id='review'>
        <div className="container">
          <div className="comments">
            <div className="res_title">
              <div className="xet">
                <h5>Customer Feedback</h5>
                <div></div>
              </div>
              <h2>Client Testimonials</h2>
            </div>
            <Swiper
              data-aos="fade-right"
              slidesPerView={4}
              spaceBetween={5}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 25,
                },
              }}
            >
              {comments.length > 0 ? (
                comments.map((comment, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="comment-card">
                      <div>
                        <div className="card-header">
                          <img
                            alt={comment.user?.username}
                            src={comment.user?.src}
                          />
                          <div className="user-info">
                            <h4>{comment.user?.username}</h4>
                            <Rating
                              name={`rating-${idx}`}
                              value={comment.rating}
                              readOnly
                            />
                            {/* <p>{moment(comment.createdAt).format("MM Do YY, h:mm a")}</p> */}
                          </div>
                        </div>
                        <div className="card-content">
                          <p>{comment.content}</p>
                        </div>
                      </div>
                      {/* <div>
                        {comment.userId === user.id && (
                          <Button
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                              }).then(async (result) => {
                                if (result.isConfirmed) {
                                  const updatedComment = data?.data.comments.filter(
                                    (x) => x.createdAt !== comment.createdAt
                                  );
                                  await commitPatch({ id, payload: { comments: updatedComment } })

                                  refetch()
                                  Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success",
                                  });
                                }
                              });
                            }}
                            color="error"
                            variant="contained"
                          >
                            <MdDelete style={{ fontSize: 20 }} />
                          </Button>
                        )}
                      </div> */}
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <div>No comments yet.</div>
              )}
            </Swiper>
          </div>
          <h3>Review</h3>
          <p>There are no reviews yet.</p>
          <h5>Be the first to review “{data?.data.title}”</h5>
          <p>Your email address will not be published. Required fields are marked *</p>
          <p>Your Rating
            <Rating
              name="rating"
              value={ratingValue}
              onChange={(event, newValue) => {
                setRatingValue(newValue);
              }}
            />
          </p>
          <form onSubmit={handleSubmitComment}>
            <div className="row">
              <textarea
                onChange={(e) => setPizzaCommit(e.target.value)}
                value={pizzaCommit}
                required
                rows="6"
                placeholder="Your Message"
              ></textarea>
            </div>
            <div style={{ padding: 0 }} className="col-12 col-md-12 col-sm-12 col-xs-12">
              <div className="com_button">
                <button type="submit">Post Comment</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ShopDetail;
