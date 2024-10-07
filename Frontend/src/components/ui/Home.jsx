import React from 'react'
import Navbar from './Nav/Navbar'
import Herosection from './Herosection'
import CategoryCarousel from '../CategoryCarousel'
import LatestJobs from '../LatestJobs'
import Footer from '../Footer'
import useGetAllJobs from '../../hooks/useGetAllJobs'


const Home = () => {
  useGetAllJobs(); 
  return (
    <div>
        <Navbar/>
        <Herosection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home