import React from 'react';
import { useFormik } from 'formik';
import './index.scss'
import { Link } from 'react-router-dom';
import loginValidation from '../../validation/loginValidation';


const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginValidation,
    onSubmit: (values, actions) => {
      actions.resetForm();
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
          {formik.errors.password && formik.touched.password &&  <div style={{ color: 'white' }} id="feedback">{formik.errors.password}</div>}
          <Link className='link' to={"/register"}>don&apos;t have an account?</Link> 
          <button style={{ marginBottom: '20px' }} type="submit">Create</button>
          <button onClick={()=>{navigate('/')}} type="submit">Return To Home</button>
        </form>
      </div>
    </div>
  );
};
export default Login