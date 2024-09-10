import React from 'react'
import './BannerInfo2.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const BannerInfo2 = () => {
  return (
      <div className='welcome-page'>
        <div className="welcome-page-head flex md:mt-0">
        <NavLink to='/'>
        <img className='logo md:ms-6 mt-2' src={assets.logo} alt="gctulogo"/> 
        </NavLink>
         <NavLink to ='/' className='mt-4 text-white'>
            <h2 className='h1 font-bold'>GCTU TIMETABLE</h2>
            <h2 className='h2'>MANAGEMENT SYSTEM</h2>
        </NavLink>
      </div>

      <div className="info text-white absolute">
          <div className="text1 font-bold mb-2">
            Welcome to GCTU Time Table Management System!
          </div>
          <div className="text2">
          <span className='block'>
          Join us in the digital age of 
          </span>
          <span>
          education and unlock your potential from anywhere
          </span>
          </div>


          <div className="buttons flex font-bold text-4xl mt-20">
            <div className="button-1 cursor-pointer">
              <NavLink to="/studentlogin">
              STUDENT
              </NavLink>
            </div>

            {/* <div className="button-2 cursor-pointer">
              <NavLink to="/lecturerlogin">
              LECTURER
              </NavLink>
            </div> */}

            <div className="button-3 cursor-pointer">
              <NavLink to="/administratorlogin">
              ADMIN
              </NavLink>
            </div>

          </div>
            <div className="prompt-text mt-4 font-semi-bold text-3xl">
              Click on a button to <span className='font-bold'>Login</span>
            </div>

      </div>

      </div>

  )
}

export default BannerInfo2
