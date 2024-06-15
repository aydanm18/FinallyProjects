
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss'
import { HiChevronRight } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const OurStory = () => {
    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true
        });
    }, []);
    return (
        <div id='ourStory'>

            <div className="row">
                <div className="col-6 col-md-12 col-sm-12 col-xs-12 ourStory-image" data-aos="fade-right">
                    <div className="storyImage">

                       
                        <div data-aos="fade-down-right" className="storyimg1">
                            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/black-jamun.png" alt="" />
                        </div>
                        <div data-aos="fade-right" className="storyimg2">
                        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/our-story.png" alt="" />
                        </div>
                        <div data-aos="fade-up-right" className="storyimg3">
                        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/onion.png" alt="" /> 
                        </div>

                    </div>
                </div>
                <div className="col-6 col-md-12 col-sm-12 col-xs-12 ourStory-title" data-aos="zoom-in-left">
                    <div className="xet">
                        <h5>Our Story</h5>
                        <div></div>
                    </div>
                    <h2>The Pizzon Has Excellent Of Quality Foods</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                    <button><Link to={'/aboutus'} className='links'>
                    READ MORE <HiChevronRight style={{ marginTop: '3px' }} className='storyicon' /></Link></button>
                </div>

            </div>
        </div>

    )
}

export default OurStory