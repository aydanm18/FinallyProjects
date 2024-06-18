import React, { useEffect } from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import BlogComment from '../blogComment';



const BlogDetail = () => {
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
                            <h1>Blog Detail</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                        <div className="contact-links">
                            <span><Link className='links' to={'/'}>Home / </Link>Blog Detail</span>
                        </div>
                    </div>

                    <div data-aos="fade-up" className="contactImg" style={{ paddingLeft: '70%', width: '100px' }}>
                        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/tamato.png" alt="Tomato" />
                    </div>
                </div>
            </div>
            <div id='postsection'>
                <div className="container">
                    <div className="card" data-aos="fade-down">
                        <div className="box">
                            <h4>Previous Post</h4>
                            <p>Nemo sodales ipsam egestas volute turpis aliquam quaerat sodales</p>
                        </div>
                        <div className="box">
                          <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/grid-img.png" alt="" />
                        </div>
                        <div className="box">
                            <h4 className='rigth'>Next Post</h4>
                            <p className='rigth'>Nemo sodales ipsam egestas volute turpis aliquam quaerat sodales</p>
                        </div>
                    </div>
                </div>
            </div>
            <BlogComment/>
        </>
    )
}

export default BlogDetail