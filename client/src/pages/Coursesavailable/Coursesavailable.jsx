import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './Coursesavailable.css'
import Adminheader from '../../components/Adminheader/Adminheader'


const Coursesavailable = () => {
  return (
    <div className='Coursesavailable'>
    <div className='flex'>
        <Sidebar/>
      <Adminheader/>           
      </div>
    </div>
  )
}

export default Coursesavailable
