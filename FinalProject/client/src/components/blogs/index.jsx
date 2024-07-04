import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import './index.scss';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import AOS from 'aos';
import 'aos/dist/aos.css';

const BlogsSection = () => {
    const token = Cookies.get('token');
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        controller.getAll(endpoints.bloks, token).then((resp) => {
            setBlogs([...resp.data]);
        });
    }, [token]);
    useEffect(() => {
        AOS.init({ duration: 1500, once: true });
      }, []);
    return (
        <div  id='blogsection'>
            <div  className="container">
                <div  className="blogsection-title">
                    <div className="xet">
                        <h5>From Our Blog</h5>
                        <div></div>
                    </div>
                    <h2>Our Latest News</h2>
                </div>
                <div className="row">
                    {blogs.length > 0 && (
                        <div data-aos="fade-down" className="col-6 col-md-6 col-sm-12 col-xs-12 featured-blog" style={{padding:0}}>
                            <div className="blogimg">
                                <img src={blogs[0].src}  />
                            </div>
                            <div className="blogsectiontitle">
                                <div className="xets">
                                    <h5>03 July 2024</h5>
                                    <div></div>
                                </div>
                               <p> <Link to={`/blog/${blogs[0]._id}`} className='links'>{blogs[0].title}</Link></p>
                               <h4><Link to={`/blog/${blogs[0]._id}`} className='links'>Read More<FaArrowRightLong className='arrow' /></Link></h4>
                            </div>
                        </div>
                    )}
                    <div data-aos="fade-right" style={{padding:0}} className="col-6 col-md-6 col-sm-12 col-xs-12">
                        <div className="row">
                            {blogs.slice(1).map((blog) => (
                                <div style={{paddingTop:0}} key={blog._id} className="col-12 col-lg-6 card">
                                    <div className="blogimg1">
                                        <img src={blog.src} alt={blog.title} />
                                    </div>
                                    <div className="blogsectiontitle">
                                        <div className="xets">
                                            <h5>03 July 2024</h5>
                                            <div></div>
                                        </div>
                                      <p><Link to={`/blog/${blog._id}`} className='links'>{blog.title}</Link></p>
                                      <h4><Link to={`/blog/${blog._id}`} className='links'>Read More<FaArrowRightLong className='arrow' /></Link></h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogsSection;
