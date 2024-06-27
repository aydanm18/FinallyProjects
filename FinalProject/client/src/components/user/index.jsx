import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Cookies from "js-cookie";
import { useSelector } from 'react-redux';
import { endpoints } from '../../services/api/constants';
import controller from '../../services/api/requests';
import './index.scss'
import Header from '../../layouts/header';

const User = () => {
    const token = Cookies.get("token");
    const userRedux = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {

        controller.getOne(endpoints.users, userRedux.id, token).then((res) => {
            setUser(res.data);
        });

    }, [userRedux, token]);
    return (
     
          <>
          <Header/>
            <div id='accound'>
                <div className="container">
                    <h2>{user?.username}'s Account</h2>
                    <div className="card">
                        <img
                            src={user?.src}
                            alt={user?.username}
                            title={user?.username}
                        />
                        <p>
                            <b>Username: </b> {user?.username}
                        </p>
                        <p>
                            <b>Email: </b> {user?.email}
                        </p>
                        <p>
                            <b>Account created at: </b> {user?.createdAt}
                        </p>
                    </div>
                </div>
            </div>
          </>
       
    )
}

export default User