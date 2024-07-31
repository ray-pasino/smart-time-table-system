import React, { useState } from 'react'
import './Dashboard.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Adminheader from '../../components/Adminheader/Adminheader'
import { assets } from '../../assets/assets'



const Dashboard = () => {

  const [buttonClicked, setbuttonClicked] = useState(false)

  const handlebuttonClicked = ()=>{
    setbuttonClicked(true)
  }

  
  const closeModal = ()=>{
    setbuttonClicked(false)

  }
  
  return (
    <div className='dashboard'>
      <div className='flex'>
        <Sidebar/>
        <div className="right">
        <Adminheader/>           
        <div className="dashboard-info m-5">
          <div className="dashboard-title text-b-blue font-bold text-3xl mb-8">WELCOME ADMINISTRATOR</div>

          <div className="small-title-container p-3 rounded-xl">
            <div className="small-title flex bg-b-blue text-white w-60 p-4 space-x-2 rounded-xl">
              <img src={assets.dashboardvectorwhite} className='h-8'/>
              <p className='font-bold text-2xl'>Dasboard</p>
            </div>
          </div>

          <div className="dashboard-stat flex mt-12 md:space-x-2 lg:space-x-24 justify-center">

            <div className="lecture-rooms text-white font-bold rounded-xl  h-48 w-64 p-2 showdow-xl">
              <div className='flex mb-8'>
              <span className='text-md lg:text-2xl'>LECTURE ROOMS</span>
              <img src={assets.whitelectureroom} className='h-12 w-16' />
              </div>
              <div className="number font-bold text-6xl">9</div>
            </div>



            <div className="courses text-white font-bold rounded-md w-64 p-2 showdow-xl">
              <div className='flex space-x-8 mb-8'>
            <span className='text-md lg:text-2xl'>COURSES</span>
            <img src={assets.courses} className='h-12 w-16' />
              </div>
              <div className="number font-bold text-6xl">27</div>
            </div>


            <div className="lecturers text-white font-bold rounded-md w-64 p-2 showdow-xl">
            <div className='flex space-x-8 mb-8'>
            <span className='text-2xl'>LECTURERS</span>
            <img src={assets.cap} className='h-12 w-16' />
              </div>
              <div className="number font-bold text-6xl">19</div>
            </div>


            <div className="classes text-white font-bold rounded-md w-64 p-2 showdow-xl">
            <div className='flex space-x-8 mb-8'>
            <span className='text-2xl'>CLASSES</span>
            <img src={assets.classes} className='h-12 w-16' />
              </div>
              <div className="number font-bold text-6xl">4</div>
            </div>


          </div>

            <div className="button-oontainer flex justify-center">
            <button className='bg-b-blue mt-40 flex flex-col items-center p-4 rounded-lg space-y-2'  onClick={handlebuttonClicked}>
              <img src={assets.whiteTimetableIcon}/>
              <p className='font-bold text-white text-xl'>GENERATE NEW TIMETABLE</p>
            </button>
            </div>




        </div>
        </div>
            {buttonClicked && 
            <>
            <div className='generate-timetable-modal-shadow' onClick={closeModal}></div>
              <div className='generate-timetable-modal rounded-md'>
                <div className="modal-title h-12">hey</div>
                <div className="modal-body">hello world</div>
            </div>
              </>
           }
      </div>
    </div>
  )
}

export default Dashboard
