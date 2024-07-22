import React from 'react'
import './BannerInfo.css'
import { assests } from '../../assets/assests'

const BannerInfo = () => {
  return (
    <div className='banner-info text-white'> 
      <div className="head flex md:mt-0">
        <img className='logo md:ms-6' src={assests.logo} alt="gctulogo"/>
        <span className='mt-4 md:text-b-blue'>
            <h2 className='h1 font-bold'>GCTU TIMETABLE</h2>
            <h2 className='h2'>MANAGEMENT SYSTEM</h2>
        </span>
      </div>
      <div className="paragraph mt-24 ms-2">
        <p className='p1 font-bold'>Welcome !</p>
        <p className='p2'>Join us in the digital age of education and unlock your potential from anywhere</p>
      </div>
    </div>
  )
}

export default BannerInfo
