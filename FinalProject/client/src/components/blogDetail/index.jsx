import React, { useEffect, useState } from 'react'
import './index.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import { FaFacebookSquare } from "react-icons/fa";
import { FaPinterestSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import Swal from "sweetalert2";
import moment from "moment";
import Button from "@mui/material/Button";
import { MdDelete } from "react-icons/md";
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';

const BlogDetail = () => {
    const { id } = useParams();
    const token = Cookies.get("token");
    const user = useSelector((state) => state.user);
    const [blog, setBlog] = useState({});
    const [commit, setCommit] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState({

        message: '',
    });

    useEffect(() => {
        if (!user.id) {
            navigate("/login");
        }
    }, [user, navigate]);
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    useEffect(() => {
        controller.getOne(endpoints.bloks, id, token).then((resp) => {
            setBlog(resp.data);
        });
    }, [token, id]);
    useEffect(() => {
        controller.getAll(endpoints.users, token).then((res) => {
            setUsers(res.data);
        });

    }, [token]);

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

            <div id='detailpage'>
                <div className="container">
                    <div className="blogsectiontitle">

                        <div className="xets">
                       
                            <div></div>
                        </div>
                        <h1>{blog?.title}</h1>
                    </div>
                    <div className="blogimg">
                        <img src={blog?.src} />
                    </div>
                    <div className="blogDes">
                        <p>{blog?.description}</p>
                        <h4>Aliquet Tempus Tempor Gravida</h4>
                        <p>Cubilia laoreet augue egestas cursus magna nihil impedit ligula risus. Mauris donec ociis et magnis sapien etiam sapien rutrum tempor mullam blandit tempor sapien and gravida Maecenas gravida porttitor nunc, quis vehicula magna luctus tempor. Quisque laoreet turpis urna augue, viverra a augue eget, dictum tempor diam.</p>
                        <div className="img">
                            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/blog-detail-2.jpg" alt="" />
                            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/blog-detail-3.jpg" alt="" />

                        </div>
                        <p>In at mauris vel nisl convallis porta at vitae dui. Nam lacus ligula, vulputate molestie bibendum quis, aliquet elementum massa. Vestibulum ut sagittis odio. Ac massa lorem. Fusce eu cursus est. Fusce non nulla vitae massa placerat vulputate vel a purus. Aliqum mullam blandit tempor sapien gravida donec
                            Nulla tincidunt volutpat tincidunt. Pellentesque habitant morbi tristique senectus et netus and malesuada famesa augue suscipit, luctus at neque purus neque dolor primis. Nemo sodales ipsam egestas volute turpis a dolores aliquam quaerat sodales sapien congue augue eget gravida laoreet turpis urna augue, viverra a augue eget, dictum dictum tempor diam. Sed pulvinar consectetur and placerat imperdiet</p>
                    </div>
                    <div className="detail_end">
                        <div className="buttons">
                            <button>Cooking</button>
                            <button>Pizzas</button>
                            <button>Stories</button>

                        </div>

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
                        <div className="box right">
                            <h4 >Next Post</h4>
                            <p >Nemo sodales ipsam egestas volute turpis aliquam quaerat sodales</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="comment">
                <div className="container">
                    <h2>{blog?.comments?.length} Comments</h2><br />
                    <div className="comments">
                        {blog?.comments && users && blog.comments.toReversed().map((commet, idx) => {
                            const currentUser = users.find((x) => x._id === commet.userId);
                            return (
                                <div key={idx} className="comment-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div className="card-header">
                                            <img
                                                className="avatar"
                                                alt={currentUser?.username}
                                                src={currentUser?.src}
                                            />
                                            <div className="user-info">
                                                <h4>{currentUser?.username}</h4>
                                                <p>{moment(commet.createdAt).format("MM Do YY, h:mm a")}</p>
                                            </div>
                                        </div>
                                        <div className="card-content">
                                            <p>{commet.content}</p>
                                        </div>
                                    </div>
                                    <div>
                                        {commet.userId === user.id && (
                                            <Button
                                                onClick={() => {
                                                    Swal.fire({
                                                        title: "Are you sure?",
                                                        text: "You won't be able to revert this!",
                                                        icon: "warning",
                                                        showCancelButton: true,
                                                        confirmButtonColor: "#3085d6",
                                                        cancelButtonColor: "#d33",
                                                        confirmButtonText: "Yes, delete it!",
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            const updatedComments = blog.comments.filter(
                                                                (x) => x.createdAt !== commet.createdAt
                                                            );
                                                            controller.patch(endpoints.bloks, blog._id, {
                                                                comments: [...updatedComments],
                                                            });
                                                            setBlog((currentBlog) => {
                                                                return {
                                                                    ...currentBlog,
                                                                    comments: updatedComments,
                                                                };
                                                            });
                                                            Swal.fire({
                                                                title: "Deleted!",
                                                                text: "Your file has been deleted.",
                                                                icon: "success",
                                                            });
                                                        }
                                                    });
                                                }}
                                                color="error"
                                                variant="contained"
                                            >
                                                <MdDelete style={{ fontSize: 20 }} />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="commentitle">
                        <h2>Leave your comment</h2>
                        <p>Your email address will not be published. Required fields are marked *</p>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const newComment = {
                            content: commit,
                            userId: user.id,
                            createdAt: new Date(),
                        };
                        controller.patch(endpoints.bloks, id, {
                            comments: [...blog.comments, newComment],
                        });
                        setBlog((currentBlog) => {
                            return {
                                ...currentBlog,
                                comments: [...currentBlog.comments, newComment],
                            };
                        });
                        setCommit("");
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Comment posted",
                            showConfirmButton: false,
                            timer: 1000,
                        });
                    }}>
                        <div className="row">

                            <div style={{ padding: 0 }} className="col-12 col-md-12 col-sm-12">

                                <div >
                                    <textarea
                                        onChange={(e) => setCommit(e.target.value)}
                                        value={commit}
                                        required
                                        name=""
                                        id=""
                                        rows="6"
                                        placeholder="Your Message"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: 0 }} className="col-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="com_button">
                                <button type="submit">Post Comment</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default BlogDetail