import React from 'react'
import Header from '../layouts/header'
import { Outlet } from 'react-router'
import Footer from '../layouts/footer'

const MainRoot = () => {
    return (
        <>
        
            <Outlet />
         
        </>
    )
}

export default MainRoot