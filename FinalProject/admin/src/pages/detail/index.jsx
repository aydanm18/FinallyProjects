import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import './index.scss'

const Detail = () => {
    const { id } = useParams();
    const token = Cookies.get('token');
    const [orderDetails, setOrderDetails] = useState({});
    const navigate = useNavigate()

    useEffect(() => {

        controller
            .getOne(endpoints.orders, id, token)
            .then((resp) => {
                setOrderDetails(resp.data);
            })
            .catch((error) => {
                console.error('Error fetching order details:', error);
            });
    }, [token, id]);

    return (
        <div id='detail'>
            {orderDetails && (
                <>
                    <div className="detail">
                        <div className="p">
                            <h2 >Order Details</h2>
                            <p>Order ID: {orderDetails._id}</p>
                        </div>
                        <div className="p1">
                            <p>First Name: {orderDetails.formFields?.firstname}</p>
                            <p>Last Name: {orderDetails.formFields?.lastname}</p>
                        </div>
                        <div className="p2">
                            <p>Company Name: {orderDetails.formFields?.companyname}</p>
                            <p>Phone Number: {orderDetails.formFields?.phoneno}</p>
                        </div>
                        <div className="p3">
                            <p>Email: {orderDetails.email}</p>
                            <p>Street Number: {orderDetails.formFields?.streetnum}</p>
                        </div>
                        <div className="p4">
                            <p>Zip Code: {orderDetails.formFields?.zip}</p>
                            <p>Country: {orderDetails.formFields?.country}</p>
                        </div>
                        <div className="p4">
                            <p>Apartment: {orderDetails.formFields?.apartment}</p>
                            <p>Town/City: {orderDetails.formFields?.town}</p>
                        </div>
                        <div className="p4">
                            <p>Message: {orderDetails.formFields?.message}</p>
                            <p>Total Price: ${orderDetails.totalPrice}</p>
                        </div>
                       <div className="buton">
                       <button onClick={() => {
                            navigate('/orders')
                        }}>Go Back</button>
                       </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Detail;
