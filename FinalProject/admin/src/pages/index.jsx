import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Sidebar from '../Sidebar'
import Header from '../Header'
import { useEffect } from 'react';

const MainRoot = () => {
  const navigate = useNavigate();
  const userRedux = useSelector((state) => state.admin);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  }
  useEffect(() => {
    if (!userRedux.id) {
      navigate('/login');
    }
  }, [userRedux, navigate]);
  if (!userRedux.id) {
    return <Outlet />;
  }
  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <Outlet />
    </div>
  )
}

export default MainRoot