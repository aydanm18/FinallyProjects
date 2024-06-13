import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss'

const OurStrength = () => {
    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true
        });
    }, []);
    return (
        <div id='ourStrength'>
                <div className="strength">
                    <div data-aos="fade-right" className="strengthTitle">
                        <div className="xet">
                            <h5>Our Strength</h5>
                            <div></div>
                        </div>
                        <h2>Why We Are The Best?</h2>
                    </div>
                    <div data-aos="fade-up" className="strengthImage">
                        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/strength-vacter.png" alt="" />
                    </div>
                </div>
            <div className="container">

                <div  data-aos="fade-up" className="row ">
                    <div className="col-3 col-md-6 col-sm-12 col-xs-12 box">
                        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/all-kinds-of-foods.png" alt="" />
                        <h4>All kinds of Foods</h4>
                        <p>Lorem Ipsum is simply dummy text of the printing and type setting industry.</p>
                    </div>
                    <div className="col-3 col-md-6 col-sm-12 col-xs-12 box">
                        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/fresh-foods.png" alt="" />
                        <h4>Fresh Foods</h4>
                        <p>Lorem Ipsum is simply dummy text of the printing and type setting industry.</p>
                    </div>
                    <div className="col-3 col-md-6 col-sm-12 col-xs-12 box">
                        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/best-taste.png" alt="" />
                        <h4>Best Taste</h4>
                        <p>Lorem Ipsum is simply dummy text of the printing and type setting industry.</p>
                    </div>
                    <div className="col-3 col-md-6 col-sm-12 col-xs-12 box">
                        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/on-time-delivery.png" alt="" />
                        <h4>On Time Delivery</h4>
                        <p>Lorem Ipsum is simply dummy text of the printing and type setting industry.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurStrength