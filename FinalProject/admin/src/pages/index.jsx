import React, { useState } from 'react'
import { Outlet } from 'react-router'

import Sidebar from '../Sidebar'
import Header from '../Header'

const MainRoot = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
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