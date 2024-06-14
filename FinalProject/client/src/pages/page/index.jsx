import React from 'react'
import NotFound from '../../components/404Page'
import AboutUs from '../../components/aboutUs'
import OurMenues from '../../components/ourMenues'
import OurTeam from '../../components/OurTeam'
import BookNow from '../../components/bookNow'

const Pagees = () => {
  return (

    <>
      <AboutUs />
      <OurMenues/>
      <OurTeam/>
      <BookNow/>
      <NotFound />
    </>
  )
}

export default Pagees