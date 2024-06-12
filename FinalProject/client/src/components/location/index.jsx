
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';

const Location = () => {
    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true
        });
    }, []);
    return (
        <div id='location'>
            <div className="container">
                <div className="row">
                    <div className="col-4 col-md-6 col-sm-12 col-xs-12 box">
                        <div className="box-image">
                            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/location.png" alt="" />
                        </div>
                        <div className="box-title">
                            <h4>Location</h4>
                            <ul>
                                <li>155 Main Street, 2nd Floor New York City</li>
                            </ul>
                        </div>

                    </div>
                    <div className="col-4 col-md-6 col-sm-12 col-xs-12 box">
                        <div className="box-image">
                            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/mail.png" alt="" />
                        </div>
                        <div className="box-title">
                            <h4>Email Address</h4>
                            <ul>
                                <li><a href="mailto:Support@gmail.com">Support@gmail.com</a></li>
                                <li><a href="mailto:Contact@gmail.com">Contact@gmail.com</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-4 col-md-6 col-sm-12 col-xs-12 box">
                        <div className="box-image">
                            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/call.png" alt="" />
                        </div>
                        <div className="box-title">
                            <h4>Contact Us</h4>
                            <ul>
                                <li><a href="tel:+49123456789">+ 49 123 456 789</a></li>
                                <li><a href="tel:+49123456789">+ 49 123 456 789</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Location