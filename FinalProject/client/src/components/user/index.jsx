import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from "js-cookie";
import { useSelector } from 'react-redux';
import { endpoints } from '../../services/api/constants';
import controller from '../../services/api/requests';
import './index.scss';
import Header from '../../layouts/header';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const User = () => {
    const token = Cookies.get("token");
    const userRedux = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await controller.getOne(endpoints.users, userRedux.id, token);
                setUser(userResponse.data);

                const ordersResponse = await controller.getAll(endpoints.orders, userRedux.id, token);
                setOrders(ordersResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
    }, [userRedux.id, token]);

    return (
        <>
            <Header />
            <div id='account'>
                <div className="container">
                    <div className="about">
                        <h2>{user?.username}'s Account</h2>
                        <div className="card">
                            <img width={100} height={100}
                                src={user?.src}
                                alt={user?.username}
                                title={user?.username}
                            />
                            <p>
                                <b>Username: </b> {user?.username}
                            </p>
                            <p>
                                <b>Email: </b> {user?.email}
                            </p>
                            <p>
                                <b>Account created at: </b> {user?.createdAt}
                            </p>
                        </div>
                    </div>

                    <div className="order">
                        <h3>Your Order's</h3>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={50}
                            pagination={{ clickable: true }}
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
                            {orders && orders.length > 0 ? (
                                orders.map((order) => (
                                    <SwiperSlide key={order._id} className="order-card">
                                        <div className="order-items">
                                           
                                            {order.items && order.items.length > 0 ? (
                                                order.items.map((item) => (
                                                    <div key={item.itemId} className="order-item">
                                                        <div className="image">
                                                            <img src={item.itemImg} alt={item.itemName} width={100} height={100} />
                                                        </div>
                                                        <p>Order ID: {order._id}</p>
                                                        <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                                        <p>Total Price: ${order.totalPrice}</p>
                                                        <p>Product: {item.itemName}</p>
                                                        <p>Quantity: {item.count}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No items in this order.</p>
                                            )}
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <p>You have no orders.</p>
                            )}
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    );
};

export default User;
