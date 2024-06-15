import React, { useEffect } from 'react';
import './index.scss';
import { FiShoppingCart } from "react-icons/fi";
import { Link } from 'react-router-dom';


const HandMade = () => {
  

    return (
        <div id='handmade'>
            <div className="container">
                <div className="row">
                    <div data-aos="fade-right" className="col-xl-5 col-lg-12 col-md-6 handmade-title">
                        <div className="handmade_content">
                            <h1>Handmade, With an Extra Pinch of <span style={{ color: 'rgb(242,46,62)' }}>Love</span></h1>
                            <p>Lorem Ipsum is simply dummy text of the <br /> printing and typesetting industry.</p>
                            <button>
                               <Link to={'/shoplist'} className='links'> <FiShoppingCart fontSize={25} className='shophome' />
                               ORDER NOW</Link>
                            </button>
                        </div>
                    </div>
                    <div data-aos="zoom-in-left" className="col-xl-7 col-lg-12 col-md-6 himage">
                        <div className="img1">
                            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/banner-img.png" alt="Banner" />
                        </div>
                        <div className="img2">
                            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/home-leaf.png" alt="Leaf" />
                        </div>
                        <div className="img3">
                            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/banner-img-bottom.png" alt="Banner Bottom" />
                        </div>
                        <div className="img4">
                            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/onion.png" alt="Onion" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HandMade;
