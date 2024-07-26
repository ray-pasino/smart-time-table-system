import React from 'react'
import './BannerInfo.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const BannerInfo = () => {
  return (
    <div className="cover">

    <div className='banner-info text-white'> 
      <div className="head flex md:mt-0">
        <NavLink to='/'>
        <img className='logo md:ms-6 mt-2' src={assets.logo} alt="gctulogo"/> 
        </NavLink>
         <NavLink to ='/' className='mt-4 md:text-b-blue'>
            <h2 className='h1 font-bold'>GCTU TIMETABLE</h2>
            <h2 className='h2'>MANAGEMENT SYSTEM</h2>
        </NavLink>
      </div>
      <div className="paragraph mt-16 ms-2">
        <p className='p1 font-bold'>Welcome !</p>
        <p className='p2'>Join us in the digital age of education and unlock your potential from anywhere</p>
      </div>
    </div>
    </div>
  )
}

export default BannerInfo
