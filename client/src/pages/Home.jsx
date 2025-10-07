import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Tstimonial from '../components/Tstimonial'
import NewsLetter from '../components/NewsLetter'
import RecommendedHotel from '../components/RecommendedHotel'

const Home = () => {
  return (
    <>
        <Hero />
        <RecommendedHotel />
        <FeaturedDestination />
        <ExclusiveOffers />
        <Tstimonial />
        <div className="grid place-items-center min-h-screen bg-gray-100">
          < NewsLetter />
        </div>
    </>
  )
}

export default Home;