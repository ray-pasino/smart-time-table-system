import React from 'react'
import './Adminheader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import { adminstratorinfo, assests } from '../../assets/assests'


const Adminheader = () => {
  return (
    <>
    <div className="adminheadergradient relative">
    <div className='AdminHeader absolute'>
        <div className='shield flex'>

         <FontAwesomeIcon icon={faBars} className='text-white my-6 sm:hidden'/>
         <Adminheader className=''/>
         <div className="progile-container flex space-x-1 text-black text-sm">
         <div className="admin-profile my-4">
            {adminstratorinfo.name} 
            <div className="text-xs ms-6 text-zinc-400">Administrator</div>
            </div>
         <img src={adminstratorinfo.profileImage} alt="profileimage" className='h-8 my-4'/>
         <img src={assests.caretdown} alt='dropdwon' className='h-4 my-6'/>
        </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Adminheader
