import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Payment successful!',
            showConfirmButton: false,
            timer: 1500,
        }).then(() => {
            navigate('/');
        });
    }, [navigate]);

    return <div style={{textAlign:'center',marginTop:'250px',fontSize:'2rem',color:'green',fontWeight:700}}>Payment successful! Redirecting...</div>;
};

export default Success;
