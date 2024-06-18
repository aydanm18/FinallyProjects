import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { endpoints } from "../../services/api/constants.js";
import Cookies from "js-cookie";
import controller from '../../services/api/requests.js';

const BlogComment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.id) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  useEffect(() => {
    controller.getOne(endpoints.bloks, id, token).then((resp) => {
      setBlog(resp.data);
    });
  }, [token, id]);
  
  return (
    <>
      <div id='comment'>
     <form >
      <input type="text" placeholder='Your Name' />
      <input type="gmail" placeholder='Your Email' />
      <textarea name="" id=""  rows="5" placeholder="Write Message"></textarea>
      <button>Post Comment</button>
     </form>

      </div>
    </>
  );
};

export default BlogComment;
