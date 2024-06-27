import React, { useState, useEffect } from 'react';
import HandMade from '../../components/handmade';
import Banner from '../../components/banner';
import OurStory from '../../components/ourStory';
import OurStrength from '../../components/ourStrength';
import Reservation from '../../components/reservation';
import BlogsSection from '../../components/blogs';
import PizzaSection from '../../components/pizza';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
 
    setTimeout(() => {
      setIsLoading(false); 
    }, 2000); 
    
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
      <HandMade />
      <Banner />
      <PizzaSection />
      <OurStory />
      <OurStrength />
      <Reservation />
      <BlogsSection />
      <Footer />
    </>
  );
};

export default Home;
