import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';

const OurTeam = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true
    });
  }, []);

  return (
    <>
      <div id='contactus'>
        <div className="container">
          <div data-aos="fade-down" style={{ paddingLeft: '50%', width: '100px' }} className="contactImg">
            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/onion.png" alt="Onion" />

          </div>
          <div className="contactus">
            <div data-aos="fade-right" className="contact-title">
              <h1>Our Team</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div data-aos="fade-left" className="contact-links">
              <span><Link className='links' to={'/'}>Home / </Link>Our Team</span>
            </div>
          </div>

          <div data-aos="fade-up" className="contactImg" style={{ paddingLeft: '70%', width: '100px' }}>
            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/tamato.png" alt="Tomato" />
          </div>
        </div>
      </div>

      <div id='skills'>
        <div className="container">
          <div className="skills">
            <div data-aos="fade-right" className="skillsTitle">
              <div className="xet">
                <h5>Our Skills</h5>
                <div></div>
              </div>
              <h2>Team of Professionals</h2>
            </div>
            <div data-aos="fade-up" className="row ">
              <div className="col-4 col-md-6 col-sm-12 col-xs-12 box">
                <div className="skilsimg">
                  <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/skill-img-1.jpg" alt="" />
                </div>
                <h4>Unique Recipes</h4>
                <p>There are many variations of passages of Ipsum available, but the majority</p>
              </div>
              <div className="col-4 col-md-6 col-sm-12 col-xs-12 box">
                <div className="skilsimg">
                  <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/skill-img-2.jpg" alt="" />
                </div>
                <h4>Quick Cooking</h4>
                <p>There are many variations of passages of Ipsum available, but the majority</p>
              </div>
              <div className="col-4 col-md-6 col-sm-12 col-xs-12 box">
                <div className="skilsimg">
                  <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/skill-img-3.jpg" alt="" />
                </div>
                <h4>Dining Experience</h4>
                <p>There are many variations of passages of Ipsum available, but the majority</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurTeam;
