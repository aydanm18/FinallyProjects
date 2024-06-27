import React, { useEffect, useState } from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaFacebookSquare } from "react-icons/fa";
import { FaPinterestSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
const BlogRigth = () => {
  const [isLoading, setIsLoading] = useState(true); 
 

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true
    });
    setTimeout(() => {
      setIsLoading(false); 
    }, 2300); 
    
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
              <h1>Blog Rigth</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div className="contact-links">
              <span><Link className='links' to={'/'}>Home / </Link>Blog Rigth</span>
            </div>
          </div>

          <div data-aos="fade-up" className="contactImg" style={{ paddingLeft: '70%', width: '100px' }}>
            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/tamato.png" alt="Tomato" />
          </div>
        </div>
      </div>
      <div id='blogrigth'>
        <div className="container">
          <div  className="row">
            <div data-aos="fade-right" className="col-8 col-md-6 col-sm-12 col-xs-12">
              <div className="box">
                <div className="img">
                  <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/blog-list-1.jpg" alt="" />
                </div>
                <div className="blogsectiontitle">
                  <div className="xets">
                    <h5>07Mar2022</h5>
                    <div></div>
                  </div>
                  <p> <Link className='links'>How to keep fear from ruining your art business with confident</Link></p>
                  <h4><Link className='links'>Read More<FaArrowRightLong className='arrow' /></Link></h4>
                </div>

              </div>
              <div className="box">
                <div className="img">
                  <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/blog-list-2.jpg" alt="" />
                </div>
                <div className="blogsectiontitle">
                  <div className="xets">
                    <h5>07Mar2022</h5>
                    <div></div>
                  </div>
                  <p> <Link className='links'>How to keep fear from ruining your art business with confident</Link></p>
                  <h4><Link className='links'>Read More<FaArrowRightLong className='arrow' /></Link></h4>
                </div>
              </div>
              <div className="box">
                <div className="img">
                  <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/blog-list-3.jpg" alt="" />
                </div>
                <div className="blogsectiontitle">
                  <div className="xets">
                    <h5>07Mar2022</h5>
                    <div></div>
                  </div>
                  <p> <Link className='links'>How to keep fear from ruining your art business with confident</Link></p>
                  <h4><Link className='links'>Read More<FaArrowRightLong className='arrow' /></Link></h4>
                </div>
              </div>
            </div>
            <div data-aos="fade-left" className="col-4 col-md-6 col-sm-12 col-xs-12 blogrigth">
              <form >
                <input type="text" placeholder='Search...' />
                <FaMagnifyingGlass className='search' />
              </form>

              <div className="category">
                <h2>Categories</h2>
                <div className="cat">
                  <p><FaArrowRightLong style={{ marginRight: '10px' }} />Slides</p>

                </div>
                <hr />
                <div className="cat">
                  <p><FaArrowRightLong style={{ marginRight: '10px' }} />Pizzas</p>

                </div>
                <hr />
                <div className="cat">
                  <p><FaArrowRightLong style={{ marginRight: '10px' }} />Offers</p>

                </div>
                <hr />
                <div className="cat">
                  <p><FaArrowRightLong style={{ marginRight: '10px' }} />Pasta</p>
                </div>
                <hr />
              </div>

              <div className="news">
                <h2>Recent News</h2>
                <div className="box1">
                  <div className="image">
                    <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/recent-1.jpg" alt="" />
                  </div>
                  <div className="title">
                    <h5>07 Mar 2022</h5>
                    <p>How to keep fear from your art business</p>
                  </div>
                </div>
                <div className="box1">
                  <div className="image">
                    <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/recent-2.jpg" alt="" />
                  </div>
                  <div className="title">
                    <h5>07 Mar 2022</h5>
                    <p>How to keep fear from your art business</p>
                  </div>
                </div>
                <div className="box1">
                  <div className="image">
                    <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/recent-3.jpg" alt="" />
                  </div>
                  <div className="title">
                    <h5>07 Mar 2022</h5>
                    <p>How to keep fear from your art business</p>
                  </div>
                </div>
              </div>

              <div className="icon">
                <h2>Follow Us</h2>
                <ul className='icons'>
                  <li><a href="#"><FaFacebookSquare style={{ color: 'rgb(59,87,157)' }} /></a></li>
                  <li><a href="#"><FaPinterestSquare style={{ color: 'rgb(204,33,39)' }} /></a></li>
                  <li><a href="#"><FaSquareTwitter style={{ color: 'rgb(44,170,225)' }} /></a></li>
                  <li><a href="#"><FaSquareInstagram style={{ color: 'rgb(220,74,56)' }} />
                  </a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default BlogRigth