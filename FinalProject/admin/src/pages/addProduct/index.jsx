import React from 'react'
import { useFormik } from 'formik';
import Swal from "sweetalert2";
import Product from '../../classes/productClass';
import ProductValidation from '../../validation/menuValidation';
import { usePostByMenuMutation } from '../../services/redux/procektApi';

const AddProduct = () => {
  const [postProduct] = usePostByMenuMutation();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: '',
      price: '',
      category: '',
    },
    validationSchema: ProductValidation,
    onSubmit: async(values, actions) => {
      const newProduct = new Product(values.title, values.description,values.image,values.price,values.category);
      await postProduct(newProduct)
         Swal.fire({
        position: "top-end",
        icon: "success",
        title: "New Product added!",
        showConfirmButton: false,
        timer: 1500
      });
      actions.resetForm();
      refetch();

    },
  });
  return (
    <div id='addblog'
    style={{
      width: "65%",
      margin: "150px auto",
      padding: "20px 27px",
      boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
      backgroundColor:'white'
    }}
    >
      <form onSubmit={formik.handleSubmit}>
        <h1>Add Product Page</h1>
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
     
        {formik.touched.description && formik.errors.description && (
          <span style={{ color: " rgb(251, 178, 0)" }}>{formik.errors.description}</span>
        )}
    
        <input
          id="price"
          name="price"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.price}
          onBlur={formik.handleBlur}
          placeholder='Price'
        />
 
        {formik.touched.price && formik.errors.price && (
          <span style={{ color: " rgb(251, 178, 0)" }}>{formik.errors.price}</span>
        )}
        <br />
        <select
          id="category"
          name="category"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.category}
        >
          <option value="" disabled>Select a category</option>
          <option value="pizzas">Pizzas</option>
          <option value="slides">Slides</option>
          <option value="offers">Offers</option>
          <option value="pasta">Pastas</option>
        </select>
        <br />
        {formik.touched.category && formik.errors.category && (
          <span style={{ color: " rgb(251, 178, 0)" }}>{formik.errors.category}</span>
        )}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddProduct