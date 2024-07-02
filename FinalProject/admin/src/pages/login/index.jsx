import React from 'react';
import { useFormik } from 'formik';
import loginValidation from '../../validation/loginValidate';
import './index.scss'
import { Link, useNavigate } from 'react-router-dom';
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import Cookies from "js-cookie";
import { login } from '../../services/redux/slices/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidation,
    onSubmit: async ({ email, password }, actions) => {
      const response = await controller.post(endpoints.login, { email, password });
      if (response) {
        dispatch(login(response.user))
        Cookies.set('token', response.token, { expires: 1, secure: true });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          actions.resetForm();
          navigate('/admin')
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
    <>
      <div id='adminlogin'>
        <form
          onSubmit={formik.handleSubmit}>
          <p>Log in with your Pizzon account</p>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            placeholder='Email'
          />
          {formik.errors.email && formik.touched.email && <div style={{ color: ' rgb(251, 178, 0)' }} id="feedback">{formik.errors.email}</div>}
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            placeholder='Password'
          />
          {formik.errors.password && formik.touched.password && <div style={{ color: ' rgb(251, 178, 0)' }} id="feedback">{formik.errors.password}</div>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Login