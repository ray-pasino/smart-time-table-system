import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'


const Header = () => {
  return (
    
       <div className="head flex text-b-blue md:mt-0  w-full md:w-full border-b bg-white md:pb-4 fixed">
        <NavLink to='/'>
        <img className='logo md:ms-6' src={assets.logo} alt="gctulogo"/>
        </NavLink>
        <NavLink to='/' className='mt-4 md:text-b-blue'>
            <h2 className='h1 font-bold'>GCTU TIMETABLE</h2>
            <h2 className='h2'>MANAGEMENT SYSTEM</h2>
        </NavLink>
      </div>
  )
}

export default Header
