import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import './index.scss'
import userValidation from '../../validation/userValidation';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import controller from '../../services/api/requests';
import User from '../../classes/userClass'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux';
import { endpoints } from '../../services/api/constants';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';
import { GrSecure } from "react-icons/gr";
import { MdOutlineDateRange } from "react-icons/md";
const MyCard = () => {


    const formik = useFormik({
        initialValues: {
            number: '',
            mmyy: '',
            cvvcode: '',
            poscalcode: '',

        },
        // validationSchema: userValidation,
        onSubmit: async (values, actions) => {

        },

    });
    return (
        <>
            <Header />
            <div id='card'

            >
                <div className="container">
                    <div className="card"
                    >
                        <form
                            onSubmit={formik.handleSubmit}>

                        <div className="cardTitle">
                            <h1>Payment details<GrSecure /></h1>
                        </div>
                            <input
                                id="number"
                                name="number"
                                type="tel"
                                onChange={formik.handleChange}
                                value={formik.values.number}
                                onBlur={formik.handleBlur}
                               

                                placeholder='Credit Card Number'
                                />

                            {formik.errors.number && formik.touched.number && <div style={{ color: 'rgb(251, 178, 0)' }} id="feedback">{formik.errors.username}</div>}
                            <div className="input1">
                                
                                <input
                                    id="mmyy"
                                    name="mmyy"
                                    type="tel"
                                    onChange={formik.handleChange}
                                    value={formik.values.mmyy}
                                    onBlur={formik.handleBlur}
                                    placeholder="MM / YY"
                                />
                                {formik.errors.mmyy && formik.touched.mmyy && <div style={{ color: 'rgb(251, 178, 0)' }} id="feedback">{formik.errors.mmyy}</div>}
                                <input
                                    id="cvvcode"
                                    name="cvvcode"
                                    type="tel"
                                    onChange={formik.handleChange}
                                    value={formik.values.cvvcode}
                                    onBlur={formik.handleBlur}
                                placeholder="CVC Code"
                                />
                                {formik.errors.cvvcode && formik.touched.cvvcode && <div style={{ color: 'rgb(251, 178, 0)' }} id="feedback">{formik.errors.cvvcode}</div>}
                            </div>

                            <input
                                id="poscalcode"
                                name="poscalcode"
                                type="tel"
                                onChange={formik.handleChange}
                                value={formik.values.poscalcode}
                                onBlur={formik.handleBlur}
                                placeholder='Pascal Code'
                            />
                            {formik.errors.poscalcode && formik.touched.poscalcode && <div style={{ color: 'rgb(251, 178, 0)' }} id="feedback">{formik.errors.poscalcode}</div>}
             
                            <button style={{ marginBottom: '20px' }} type="submit">Upgrade</button>

                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default MyCard