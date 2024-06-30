import React from 'react';
import { useFormik } from 'formik';
import Blog from '../../classes/blogClass';
import Swal from "sweetalert2";
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import BlogValidation from '../../validation/blogValidation';
import './index.scss'

const AddBlog = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      src: '',
    },
    validationSchema: BlogValidation,
    onSubmit: ({ title, description, src }, actions) => {
      const newBlog = new Blog(title, description, src);
      controller.post(endpoints.bloks, newBlog).then(() => {
        actions.resetForm();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New Blog Posted",
          showConfirmButton: false,
          timer: 1500
        });
      });
    },
  });
  return (
    <div id='addblog'>
      <form onSubmit={formik.handleSubmit}>
        <h1>Add Blog Page</h1>

        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
          onBlur={formik.handleBlur}
          placeholder='Title'
        /> <br />
        {formik.touched.title && formik.errors.title && (
          <span style={{ color: "red" }}>{formik.errors.title}</span>
        )}
      
        <input
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.description}
          onBlur={formik.handleBlur}
          placeholder='Description'
        />
   
        {formik.touched.description && formik.errors.description && (
          <span style={{ color: "red" }}>{formik.errors.description}</span>
        )}
       
        <input
          id="src"
          name="src"
          type="url"
          onChange={formik.handleChange}
          value={formik.values.src}
          onBlur={formik.handleBlur}
          placeholder='ImageUrl'
        />
        {/* <br /> */}
        {formik.touched.src && formik.errors.src && (
          <span style={{ color: "red" }}>{formik.errors.src}</span>
        )}
        <br />


        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBlog