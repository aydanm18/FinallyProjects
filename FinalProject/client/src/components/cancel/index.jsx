import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Cancel = () => {
    const navigate = useNavigate();
    useEffect(() => {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Payment Cancel!',
            showConfirmButton: false,
            timer: 1500,
        }).then(() => {
            navigate('/checkout');
        });
    }, [navigate]);
    return (
        <div>
           
            <p style={{textAlign:'center',marginTop:'250px',fontSize:'2rem',color:'red',fontWeight:700}}>Your payment was cancelled.</p>
        </div>
    );
};

export default Cancel;
