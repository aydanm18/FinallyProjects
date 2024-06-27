import React, { useState } from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
const BlogRigth = () => {
  // const [blogs, setBlogs] = useState([]);

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
      <div id='blogrigth'>
        <div className="container">
          <div className="row">
            <div className="col-8">
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
            <div className="col-4 blogrigth">
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogRigth