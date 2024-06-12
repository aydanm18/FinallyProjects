import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';
import { useNavigate } from 'react-router';

const NotFound = () => {
    const navigate=useNavigate()
    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true
        });
    }, []);

    return (
        <div id='notfound'>
            <div className="container">
                <div className="row">
                    <div data-aos="fade-down" className="col-12 notfound">
                        <div className="notfoundImg">
                          <div className="leaf">
                             <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/error-top.png" alt="" />
                          </div>
                            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/error-img.png" alt="Error" />
                        </div>
                        <div className="notfoundTitle">
                            <h1>Page Not Found</h1>
                            <p>We're sorry, The page you are looking for no longer exists.</p>
                        </div>
                        <button onClick={() =>navigate('/')}>BACK TO HOMEPAGE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
