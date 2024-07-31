import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './lecturerooms.css'
import Adminheader from '../../components/Adminheader/Adminheader'


const Lecturerooms = () => {
  return (
    <div className='Lecturerooms'>
      <div className='flex'>
        <Sidebar/>
      <Adminheader/>           
      </div>
    </div>
  )
}

export default Lecturerooms
