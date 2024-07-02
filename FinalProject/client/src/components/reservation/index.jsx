import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const Reservation = () => {
    const [users, setUsers] = useState([]);
    const user = useSelector((state) => state.user);
    const token = Cookies.get('token');
    const [formFields, setFormFields] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        guest: '',
    })
    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true
        });
    }, []);
    useEffect(() => {
        controller.getAll(endpoints.users, token).then((res) => {
            setUsers(res.data);
        });
    }, [token]);

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

            if (!userId) {
                throw new Error('User ID is missing.');
            }

            const reservationDetails = {
                userId,
                ...formFields,
            };

            const response = await controller.post(endpoints.reservations, reservationDetails);
            console.log(response);

            setFormFields({
                name: '',
                phone: '',
                email: '',
                date: '',
                time: '',
                guest: '',
            });

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Reservation successfully!',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error('Error sending message:', error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error sending message!',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };
    return (
        <div id='reservation'>
            <div className="container">

                <div className="row">
                    <div data-aos="fade-right" className="col-6 col-md-6 col-sm-12 col-xs-12 forms">

                        <form onSubmit={handleSubmit}>
                            <div className="res_title">
                                <div className="xet">
                                    <h5>Reservation</h5>
                                    <div></div>
                                </div>
                                <h2>Book A Table Now!</h2>
                            </div>
                            <div className="row">

                                <div style={{ padding: 0 }} className="col-6 col-md-6 col-sm-12 col-xs-12">

                                    <div className="input">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Name*"
                                            value={formFields.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>


                                    <div className="input">
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone*"
                                            value={formFields.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>


                                    <div className="input">
                                        <input
                                            type="date"
                                            name="date"
                                            placeholder='Date*'
                                            value={formFields.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div style={{ padding: 0 }} className="col-6 col-md-6 col-sm-12 col-xs-12">
                                    <div className="input">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email*"
                                            value={formFields.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="input">
                                        <input
                                            type="time"
                                            name="time"
                                            placeholder='Time*'
                                            value={formFields.time}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="input">
                                        <input
                                            type="number"
                                            name="guest"
                                            placeholder="Guest*"
                                            value={formFields.guest}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{ padding: 0 }} className="col-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="res_button">
                                    <button type="submit">BOOK NOW</button>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="col-6 col-md-6 col-sm-12 col-xs-12 images">
                        <div data-aos="zoom-in-left" className="res_image">

                            <div className="leaf">
                                <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/leaf-1.png" alt="" />
                                <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/leaf-2.png" alt="" />
                                <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/leaf-3.png" alt="" />
                            </div>
                            <img className='imageres' src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/reservation-pizza.png" />
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Reservation;
