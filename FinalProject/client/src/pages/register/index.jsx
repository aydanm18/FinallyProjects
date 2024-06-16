import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import './index.scss'
import userValidation from '../../validation/userValidation';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import User from '../../classes/userClass';
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux';

const Register = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.id) {
      navigate("/");
    }
  }, [navigate, user]);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      repeat_password: '',
      email: '',
      src: ''
    },
    validationSchema: userValidation,
    onSubmit: async (values, actions) => {
      const newUser = new User(values.username, values.email, values.password, values.src)
      const response = await controller.post(endpoints.users, newUser);
      if (response.error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: response.message,
          showConfirmButton: false,
          timer: 1000
        })
      }
      else{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign Up successfully",
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          navigate('/login')
        });
        actions.resetForm();
      }
      
    },

  });
  return (
    <div id='register'>
      <div className="container">
        <div  className="register"
    >
          <div className="registerTitle">
            <h1>Get in touch</h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              onBlur={formik.handleBlur}
              placeholder='User Name'
            />
            {formik.errors.username && formik.touched.username && <div style={{ color: 'white' }} id="feedback">{formik.errors.username}</div>}
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              placeholder='Password'
            />
            {formik.errors.password && formik.touched.password && <div style={{ color: 'white' }} id="feedback">{formik.errors.password}</div>}

            <input
              id="repeat_password"
              name="repeat_password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.repeat_password}
              onBlur={formik.handleBlur}
              placeholder='Confirm Password'
            />
            {formik.errors.repeat_password && formik.touched.repeat_password && <div style={{ color: 'white' }} id="feedback">{formik.errors.repeat_password}</div>}
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              placeholder='Email'
            />
            {formik.errors.email && formik.touched.email && <div style={{ color: 'white' }} id="feedback">{formik.errors.email}</div>}
            <input
              id="src"
              name="src"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.src}
              onBlur={formik.handleBlur}
              placeholder='Profile Image'
            />
            {formik.errors.src && formik.touched.src && <div style={{ color: 'white' }} id="feedback">{formik.errors.src}</div>}
            <Link className='link' to={"/login"}>already have an account?</Link>
            <button style={{ marginBottom: '20px' }} type="submit">Create</button>
            <button onClick={() => { navigate('/') }} type="submit">Return To Home</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register