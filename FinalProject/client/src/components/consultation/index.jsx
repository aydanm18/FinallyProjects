import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const Consultation = () => {
    const [users, setUsers] = useState([]);
    const user = useSelector((state) => state.user);
    const token = Cookies.get('token');
    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        phone: '',
        website: '',
        message: '',
    });

    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true,
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

            const messageDetails = {
                userId,
                ...formFields,
            };

            const response = await controller.post(endpoints.messages, messageDetails);
            console.log(response);

            setFormFields({
                name: '',
                email: '',
                phone: '',
                website: '',
                message: '',
            });

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Message sent successfully!',
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
        <div id='consultation'>
            <div className='container'>
                <div className='row'>
                    <div data-aos='fade-right' className='col-6 col-md-6 col-sm-12 col-xs-12 forms'>
                        <form onSubmit={handleSubmit}>
                            <div className='res_title'>
                                <div className='xet'>
                                    <h5>Consultation</h5>
                                    <div></div>
                                </div>
                                <h2>Send Us Message</h2>
                            </div>
                            <div className='row'>
                                <div style={{ padding: 0 }} className='col-6 col-md-6 col-sm-12 col-xs-12'>
                                    <div className='input'>
                                        <input
                                            type='text'
                                            name='name'
                                            placeholder='Name*'
                                            value={formFields.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className='input'>
                                        <input
                                            type='tel'
                                            name='phone'
                                            placeholder='Phone*'
                                            value={formFields.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div style={{ padding: 0 }} className='col-6 col-md-6 col-sm-12 col-xs-12'>
                                    <div className='input'>
                                        <input
                                            type='email'
                                            name='email'
                                            placeholder='Email*'
                                            value={formFields.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className='input'>
                                        <input
                                            type='text'
                                            name='website'
                                            placeholder='Website*'
                                            value={formFields.website}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div style={{ padding: 0 }} className='col-12 col-md-12 col-sm-12'>
                                    <div>
                                        <textarea
                                            name='message'
                                            rows='5'
                                            placeholder='Write Message'
                                            value={formFields.message}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: 0 }} className='col-12 col-md-12 col-sm-12 col-xs-12'>
                                <div className='res_button'>
                                    <button type='submit'>Send Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='col-6 col-md-6 col-sm-12 col-xs-12 images'>
                        <div data-aos='zoom-in-left' className='res_image'>
                            <img src='https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/cons-img.jpg' alt='Consultation Image' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Consultation;
