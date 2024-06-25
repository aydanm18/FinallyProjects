import React from 'react'
import HandMade from '../../components/handmade'
import Banner from '../../components/banner'
import OurStory from '../../components/ourStory'
import OurStrength from '../../components/ourStrength'
import Reservation from '../../components/reservation'
import BlogsSection from '../../components/blogs'
import PizzaSection from '../../components/pizza'

const Home = () => {

  return (
   <>
   <HandMade/>
   <Banner/>
   <PizzaSection/>
   <OurStory/>
   <OurStrength/>
   <Reservation/>
   <BlogsSection/>
   </>
  )
}

export default Home