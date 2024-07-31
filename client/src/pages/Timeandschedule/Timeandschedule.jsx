import React from 'react'
import './Timeandschedule.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Adminheader from '../../components/Adminheader/Adminheader'



const Timeandschedule = () => {
  return (
    <div className='Timeandschedule'>
   <div className='flex'>
        <Sidebar/>
      <Adminheader/>           
      </div>
    </div>
  )
}

export default Timeandschedule
