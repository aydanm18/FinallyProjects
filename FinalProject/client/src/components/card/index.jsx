import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';
import Basket from '../../pages/basket';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';

const Card = () => {

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        AOS.init({
            duration: 2300,
            once: true
        });

    }, []);

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
            <div id='contactus'>
                <div className="container">
                    <div data-aos="fade-down" style={{ paddingLeft: '50%', width: '100px' }} className="contactImg">
                        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/onion.png" alt="Onion" />

                    </div>
                    <div className="contactus">
                        <div data-aos="fade-right" className="contact-title">
                            <h1>Card</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                        <div data-aos="fade-left" className="contact-links">
                            <span><Link className='links' to={'/'}>Home / </Link>Card</span>
                        </div>
                    </div>

                    <div data-aos="fade-up" className="contactImg" style={{ paddingLeft: '70%', width: '100px' }}>
                        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/tamato.png" alt="Tomato" />
                    </div>
                </div>
            </div>
            <Basket />
            <Footer />
        </>
    );
};

export default Card;
