import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import './index.scss'
import { Link, useNavigate } from 'react-router-dom';
import loginValidation from '../../validation/loginValidation';
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../services/redux/slices/userSlice';
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import Swal from 'sweetalert2'
import Cookies from "js-cookie";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.id) {
      navigate("/");
    }
  }, [navigate, user]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginValidation,
    onSubmit: async ({ email, password }, actions) => {
      const response = await controller.post(endpoints.login, { email, password });

      if (response.auth) {
        dispatch(login(response.user))
        //token
        Cookies.set('token', response.token, { expires: 1, secure: true });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          actions.resetForm();
          navigate('/')
        })
      }
      else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: response.message,
          showConfirmButton: false,
          timer: 1000
        })
      }
    },

  });
  return (
    <div id='login'>
      <div className="container">
        <div className="loginTitle">
          <h1>Get in touch</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
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
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            placeholder='Password'
          />
          {formik.errors.password && formik.touched.password && <div style={{ color: 'white' }} id="feedback">{formik.errors.password}</div>}
          <Link className='link' to={"/register"}>don&apos;t have an account?</Link>
          <button style={{ marginBottom: '20px' }} type="submit">Create</button>
          <button onClick={() => { navigate('/') }} type="submit">Return To Home</button>
        </form>
      </div>
    </div>
  );
};
export default Login