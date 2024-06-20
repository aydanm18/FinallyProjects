import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';

const Consultation = () => {
    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true
        });
    }, []);
    return (
        <div id='consultation'>
            <div className="container">

                <div className="row">
                    <div data-aos="fade-right" className="col-6 col-md-6 col-sm-12 col-xs-12 forms">

                        <form >
                            <div className="res_title">
                                <div className="xet">
                                    <h5>Consultation</h5>
                                    <div></div>
                                </div>
                                <h2>Send Us Message</h2>
                            </div>
                            <div className="row">

                                <div style={{ padding: 0 }} className="col-6 col-md-6 col-sm-12 col-xs-12">

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

                                </div>
                                <div style={{ padding: 0 }} className="col-6 col-md-6 col-sm-12 col-xs-12">
                                    <div className="input">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email*"
                                        />
                                    </div>

                                    <div className="input">
                                        <input
                                            type="url"
                                            name="time"
                                            placeholder='Website*'
                                        />
                                    </div>
                                </div>
                                <div style={{ padding: 0 }} className="col-12 col-md-12 col-sm-12">

                                    <div >
                                        <textarea name="" id="" rows="5" placeholder="Write Message"></textarea>
                                    </div>
                                </div>

                            </div>

                            <div style={{ padding: 0 }} className="col-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="res_button">
                                    <button type="submit">Send Message</button>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="col-6 col-md-6 col-sm-12 col-xs-12 images">
                        <div data-aos="zoom-in-left" className="res_image">
                            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/cons-img.jpg" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Consultation