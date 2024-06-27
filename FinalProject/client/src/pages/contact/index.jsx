import React, { useEffect, useState } from 'react'
import ContactUs from '../../components/contactus'
import Consultation from '../../components/consultation'
import Iframe from '../../components/iframe'
import Location from '../../components/location'
import Header from '../../layouts/header'
import Footer from '../../layouts/footer'

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
 
    setTimeout(() => {
      setIsLoading(false); 
    }, 1500); 
  }, []);

  if (isLoading) {
    return (
      <div className="container">
       <div className="loading-spinner">
       <img
          src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/preloader.svg"
          alt="Loading..."
        />
       </div>
      </div>
    );
  }
  return (
    <>
      <Header />
      <ContactUs />
      <Consultation />
      <Iframe />
      <Location />
      <Footer />
    </>
  )
}

export default Contact