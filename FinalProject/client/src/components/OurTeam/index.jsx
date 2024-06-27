import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import Cookies from 'js-cookie';
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';

import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';

const OurTeam = () => {
  const token = Cookies.get('token');
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    controller.getAll(endpoints.teams, token).then((resp) => {
      setTeams([...resp.data]);
    });
  }, [token]);
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true
    });
  }, []);

  useEffect(() => {
 
    setTimeout(() => {
      setIsLoading(false); 
    }, 2000); 
  }, []);

  if (isLoading) {
    return (
      <div className="container">
       <div className="loading-spinner">
       <img
          src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/preloader.svg"
          alt="Loading..."
        />
       </div>
      </div>
    );
  }
  return (
    <>
     <Header />
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
      <div data-aos="fade-right" id='team'>
        <div className="container">
          <div className="row">
            {teams && teams.map((team)=>{
              return(
                <div key={team._id} className="col-4 col-md-6 col-sm-12 col-xs-12 box">
                <div className="image">
                  <img src={team.image} alt={team.title} />
                  <ul>
                    <li><a href="#"><FaFacebookF /></a></li>
                    <li><a href="#"><FaTwitter /></a></li>
                    <li><a href="#"><FaInstagram /></a></li>
                  </ul>
                </div>
                <div className="teamTitle">
                  <h4><Link className='links' to={'/team'}>{team.title}</Link></h4>
                  <p>{team.description}</p>
                </div>
              </div>
              )
            }) 
             
            }
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
      <Footer />
    </>
  );
};

export default OurTeam;
