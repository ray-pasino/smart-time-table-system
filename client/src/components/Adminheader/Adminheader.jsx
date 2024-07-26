import React, { useState } from 'react'
import './Adminheader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import { adminstratorinfo, assets } from '../../assets/assets'
import Sidebar from '../sidebar/Sidebar'


const Adminheader = () => {

const [showSidebar, setShowSidebar] = useState(false)
const [isClosing, setIsClosing] = useState(false)

const toggleshowSidebar = () => {
  if (showSidebar) {
    setIsClosing(true);
    setTimeout(() => {
      setShowSidebar(false);
      setIsClosing(false);
    }, 500); // Duration of the exit animation
  } else {
    setShowSidebar(true);
  }
};


  return (
    <>
          {showSidebar ? <Sidebar toggleshowSidebar={toggleshowSidebar} isClosing={isClosing}/> : <></>}
    <div className="adminheadergradient relative">
    <div className='AdminHeader absolute'>
        <div className='shield flex'>
         <FontAwesomeIcon icon={faBars} className='text-white sm:text-2xl my-8 md:hidden cursor-not-allowed'/>
         <FontAwesomeIcon icon={faBars} className='text-white text-2xl my-8 hidden md:block menubtn cursor-pointer' onClick={toggleshowSidebar}/>
         <div className="progile-container flex space-x-1 text-black text-sm sm:my-2 md:font-semibold">
         <div className="admin-profile my-4">
            {adminstratorinfo.name} 
            <div className="text-xs ms-6 text-zinc-400">Administrator</div>
            </div>
         <img src={adminstratorinfo.profileImage} alt="profileimage" className='h-8 my-4'/>
         <img src={assets.caretdown} alt='dropdwon' className='h-4 my-6'/>
        </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Adminheader
