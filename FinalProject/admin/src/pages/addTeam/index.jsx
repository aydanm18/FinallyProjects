import React from 'react';
import { useFormik } from 'formik';
import Swal from "sweetalert2";
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import TeamValidation from '../../validation/teamvalidation';
import Team from '../../classes/teamClass';

const AddTeam = () => {
  const formik = useFormik({
    initialValues: {
      image: '',
      title: '',
      description: '',
    },
    validationSchema: TeamValidation,
    onSubmit: ({image, title, description }, actions) => {
      const newTeam = new Team(image,title, description);
      controller.post(endpoints.teams, newTeam).then(() => {
        actions.resetForm();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New Team Posted",
          showConfirmButton: false,
          timer: 1500
        });
      });
    },
  });
  return (
    <div
    style={{
      width: "65%",
      margin: "150px auto",
      padding: "20px 27px",
      boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
      backgroundColor:'white'
    }}
     id='addblog'>
      <form onSubmit={formik.handleSubmit}>
        <h1>Add Team Page</h1>
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
          <span style={{ color: " rgb(251, 178, 0)" }}>{formik.errors.title}</span>
        )}
        <input
          id="image"
          name="image"
          type="url"
          onChange={formik.handleChange}
          value={formik.values.image}
          onBlur={formik.handleBlur}
          placeholder='ImageUrl'
        />
        <br />
        {formik.touched.image && formik.errors.image && (
          <span style={{ color: " rgb(251, 178, 0)" }}>{formik.errors.image}</span>
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
        <br />
        {formik.touched.description && formik.errors.description && (
          <span style={{ color: "rgb(251, 178, 0)" }}>{formik.errors.description}</span>
        )}
        <br />
      
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTeam