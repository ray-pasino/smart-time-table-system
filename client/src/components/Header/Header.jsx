import React from 'react'
import './Header.css'
import { assests } from '../../assets/assests'


const Header = () => {
  return (
    
       <div className="head flex text-b-blue md:mt-0">
        <img className='logo md:ms-6' src={assests.logo} alt="gctulogo"/>
        <span className='mt-4 md:text-b-blue'>
            <h2 className='h1 font-bold'>GCTU TIMETABLE</h2>
            <h2 className='h2'>MANAGEMENT SYSTEM</h2>
        </span>
      </div>
  )
}

export default Header
