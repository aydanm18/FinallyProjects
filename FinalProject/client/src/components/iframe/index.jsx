import React from 'react';
import './index.scss'; // Assuming you have some styles for the iframe container

const Iframe = () => {
    return (
        <div id='iframe'>
           
                <div className="map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d24195.665120828056!2d-74.01115!3d40.70793!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2sus!4v1711328142998!5m2!1str!2sus"
                        width="100%"
                        height="550"
                        style={{ border: '2px solid blue' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    >

                    </iframe>
                  
            
            </div>
        </div>
    );
};

export default Iframe;
