import React from 'react'
import BlogDetail from '../../components/blogDetail'
import { Header } from 'antd/es/layout/layout'
import Footer from '../../layouts/footer'
import BlogLeft from '../../components/blogLeft'
import BlogRigth from '../../components/blogRigth'

const Blog = () => {
  return (
    <>
    <Header/>
    <BlogLeft/>
   <BlogRigth/>
    <Footer/>
    </>
  )
}

export default Blog