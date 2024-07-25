import React from 'react'
import './Login.css'
import { assests } from '../../assets/assests'
import { NavLink } from 'react-router-dom'


const Login = () => {
  return (
    <>
    <div className='login '>
       <div className="banner-border"></div>
       <div className="gradient h-64"></div>
      <img className='bannerImg h-64' src={assests.adminBlock}/>
      <div className="login-links mx-4">
      <p>ARE YOU</p>
      <div className="button-container space-x-4">
      <NavLink  to='/studentlogin' className='btn'>a student</NavLink>
      <NavLink to='/lecturerlogin' className='btn'>a lecturer</NavLink>
      <NavLink to='/administratorlogin' className='btn'>Admin Login</NavLink>
      </div>
      </div>
    </div>
    </>
  )
}

export default Login
