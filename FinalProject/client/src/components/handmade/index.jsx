import React from 'react'
import './index.scss'
import { FiShoppingCart } from "react-icons/fi";
const HandMade = () => {
    return (
        <div id='handmade'>
            <div className="container">
                <div className="row">
                    <div className="col-xl-5 col-lg-6 col-md-6 handmade-title">
                        <div className="handmade_content">
                            <h1>Handmade, With an Extra Pinch of <span style={{ color: 'rgb(242,46,62)' }}>Love</span></h1>
                            <p>Lorem Ipsum is simply dummy text of the <br /> printing and typesetting industry.</p>
                            <button><FiShoppingCart fontSize={25} className='shophome' />ORDER NOW</button>
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-6 col-md-6 handmade-image">
                        
                        <div className="circle">
                            
                        </div>
                    </div>
                   
                </div>
            </div>

        </div>

    )
}

export default HandMade