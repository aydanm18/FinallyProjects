import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss'

const Banner = () => {
    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true
        });
    }, []);

    return (
        <div id='banner'>

            <div className="row">
                <div className="col-xl-5 col-lg-12 col-md-6 banner-image" data-aos="fade-right">
                    <div className="banImage">
                        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/daily-fresh.png" alt="" />
                    </div>
                </div>
                <div className="col-xl-7 col-lg-12 col-md-6 banner-title" data-aos="fade-left">
                    <h3>Daily fresh and always tasty</h3>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority haved</p>
                </div>
                <div data-aos="zoom-in-left" className="bannerImg">
                    <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/daily-fresh-vacter.png" alt="" />
                </div>
            </div>
        </div>

    );
}

export default Banner;
