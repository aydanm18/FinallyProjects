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
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await controller.getOne(endpoints.users, userRedux.id, token);
                setUser(userResponse.data);

                const ordersResponse = await controller.getAll(endpoints.orders, token);
                const userOrders = ordersResponse.data.filter(order => order.userId === userRedux.id);
                setOrders(userOrders);
                setFilteredOrders(userOrders);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
    }, [userRedux.id, token]);

    useEffect(() => {
        let filtered = orders;
        if (filter !== 'All') {
            filtered = filtered.filter(order => order.status === filter.toLowerCase());
        }
        if (searchTerm) {
            filtered = filtered.filter(order => order.items.some(item => item.itemName.toLowerCase().includes(searchTerm.toLowerCase())));
        }
        setFilteredOrders(filtered);
    }, [filter, searchTerm, orders]);

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
                                <b>Account created at: </b> {new Date(user?.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="order">
                        <h3>Your Orders</h3>
                        <div className="seach-select">
                            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                                <option value="All">All</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Pending">Pending</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Search by title"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
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
                            {filteredOrders && filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <SwiperSlide key={order._id} className="order-card">
                                        <div className="order-items">
                                            <p><b>Status:</b> {order.status}</p>
                                            {order.items && order.items.length > 0 ? (
                                                order.items.map((item) => (
                                                    <div key={item.itemId} className="order-item">
                                                        <div className="image">
                                                            <img src={item.itemImg} alt={item.itemName} width={100} height={100} />
                                                        </div>
                                                        <p><b>Order ID:</b> {order._id}</p>
                                                        <p><b>Order Date:</b> {new Date(order.createdAt).toLocaleDateString()}</p>
                                                        <p><b>Total Price:</b> ${order.totalPrice.toFixed(2)}</p>
                                                        <p><b>Product:</b> {item.itemName}</p>
                                                        <p><b>Quantity:</b> {item.count}</p>
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
