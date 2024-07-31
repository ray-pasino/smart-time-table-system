import React from 'react'
import './Adminheader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {adminstratorinfo} from '../../assets/assets'



const Adminheader = () => {



  return (
    <>
          
    <div className="adminheadergradient">
        <div className='shield flex float-end'>
         <div className="progile-container flex space-x-1 text-black text-sm sm:my-2 md:font-semibold">
         <div className="admin-profile my-4">
            {adminstratorinfo.name} 
            <div className="text-xs ms-6 text-zinc-400">Administrator</div>
            </div>
         <FontAwesomeIcon icon={faUser} className='my-4 text-xl cursor-pointer'/>
        </div>
    </div>
    </div>
    </>
  )
}

export default Adminheader
