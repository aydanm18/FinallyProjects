import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';

const Reservation = () => {
    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true
        });
    }, []);

    return (
        <div id='reservation'>
            <div className="container">

                <div className="row">
                    <div data-aos="fade-right" className="col-6 col-md-6 col-sm-12 col-xs-12 forms">

                        <form>
                            <div className="res_title">
                                <div className="xet">
                                    <h5>Reservation</h5>
                                    <div></div>
                                </div>
                                <h2>Book A Table Now!</h2>
                            </div>
                            <div className="row">

                                <div className="col-6 col-md-6 col-sm-12 col-xs-12">

                                    <div className="input">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Name*"
                                        />
                                    </div>


                                    <div className="input">
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone*"
                                        />
                                    </div>


                                    <div className="input">
                                        <input
                                            type="text"
                                            name="date"
                                            placeholder='Date*'
                                        />
                                    </div>
                                </div>
                                <div className="col-6 col-md-6 col-sm-12 col-xs-12">
                                    <div className="input">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email*"
                                        />
                                    </div>

                                    <div className="input">
                                        <input
                                            type="text"
                                            name="time"
                                            placeholder='Time*'
                                        />
                                    </div>

                                    <div className="input">
                                        <input
                                            type="number"
                                            name="guest"
                                            placeholder="Guest*"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="res_button">
                                    <button type="submit">BOOK TABLE</button>
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
