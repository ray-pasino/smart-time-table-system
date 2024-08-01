import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './lecturerooms.css'
import Adminheader from '../../components/Adminheader/Adminheader'
import { assets } from '../../assets/assets'


const Lecturerooms = () => {
  return (
    <div className='Lecturerooms'>
      <div className='flex'>
        <Sidebar/>
        <div className="lecture-room">
        <Adminheader/>           
        <div className="lecture-room-info m-5">

        <div className="dashboard-title text-b-blue font-bold text-3xl mb-8">WELCOME ADMINISTRATOR</div>

<div className="small-title-container p-3 rounded-xl">
  <div className="small-title flex bg-b-blue text-white w-60 p-4 space-x-2 rounded-xl">
    <img src={assets.dashboardvectorwhite} className='h-8'/>
    <p className='font-bold text-2xl'>Dasboard</p>
  </div>
</div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Lecturerooms
