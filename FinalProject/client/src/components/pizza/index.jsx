import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './index.scss';
import { Pagination } from 'swiper/modules';
import { useGetMenusQuery } from '../../services/redux/procektApi';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";
import AOS from 'aos';
import 'aos/dist/aos.css';

const PizzaSection = () => {
  const { data: menues, refetch } = useGetMenusQuery(); 
  const [category, setCategory] = useState("pizzas");

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true
    });
  }, []);

  const filteredMenus = menues?.data.filter(menu => menu.category === category);

  return (
    <div id='pizzaSection'>
      <div className="container">
        <div data-aos="fade-right" className="strengthTitle">
          <div className="xet">
            <h5>Popular Dishes</h5>
            <div></div>
          </div>
          <h2>Browse Our Menu</h2>
        </div>
        <Swiper data-aos="fade-right"
          slidesPerView={3}
          spaceBetween={30}
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
              slidesPerView: 3,
              spaceBetween: 25,
            },
          }}
        >
          {filteredMenus && filteredMenus.map((menu) => (
            <SwiperSlide key={menu._id} className='slider'>
              <div className="box">
                <Link to={`/shopdetail/${menu._id}`}><img src={menu.image} alt={menu.title} /></Link>

                <div className="cardTitle">
                <Link to={`/shopdetail/${menu._id}`}> <h3 style={{ fontWeight: 600, color: 'black' }}>{menu.title}</h3></Link>
                 
                  <h3 style={{ color: 'rgb(242,46,62)' }}>${menu.price}.00</h3>
                </div>
                <p>{menu.description.substring(0, 63)}...</p>
                <button>
                  <Link to={`/shopdetail/${menu._id}`} className='links'> <FiShoppingCart style={{ paddingTop: '7px' }} fontSize={25} className='shophome' />
                    ORDER NOW</Link>
                </button>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PizzaSection;
