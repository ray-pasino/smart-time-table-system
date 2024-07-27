import React, { useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'


const Sidebar = ({isClosing , toggleshowSidebar}) => {


  const [select, setisSelected] = useState(false)
  const [select1, setisSelected1] = useState(false)
  const [select2, setisSelected2] = useState(false)
  const [select3, setisSelected3] = useState(false)
  const [select4, setisSelected4] = useState(false)

  const toggleIsSelected = ()   => {
    setisSelected(!select)
    setisSelected1(false)
    setisSelected2(false)
    setisSelected3(false)
    setisSelected4(false)
  }

  const toggleIsSelected1 = ()   => {
    setisSelected1(!select1)
    setisSelected(false)
    setisSelected2(false)
    setisSelected3(false)
    setisSelected4(false)
  }

  const toggleIsSelected2 = ()   => {
    setisSelected2(!select2)
    setisSelected(false)
    setisSelected1(false)
    setisSelected3(false)
    setisSelected4(false)
  }

  const toggleIsSelected3 = ()   => {
    setisSelected3(!select3)
    setisSelected2(false)
    setisSelected(false)
    setisSelected1(false)
    setisSelected4(false)
  }

  const toggleIsSelected4 = ()   => {
    setisSelected4(!select4)
    setisSelected2(false)
    setisSelected(false)
    setisSelected1(false)
    setisSelected3(false)
  }
  return (
    <>
    <div className={`${isClosing ? 'fadeShadow' : 'shadow'} w-full h-full hidden sm:block absolute z-10`} onClick={toggleshowSidebar}></div>
    <div className={`sidebar hidden sm:block h-full absolute z-20 ${isClosing ? 'slideout' : ' '}`}>
      <div className="info mt-4">

        <div className="title-container justify-center flex" onClick={toggleIsSelected}>
        <img src={assets.timetableicon} className='h-8 me-2'/>
      <h2 className='text-b-blue font-bold text-2xl'>TIME TABLE</h2>
        </div>

        <div className="details mt-20 space-y-20 mx-14">

          <div className={`generate-time-table cursor-pointer flex space-x-4 ${select ? 'selected' : ' '}`} onClick={toggleIsSelected}>
              <img src={assets.generatetimetableicon} className='h-7'/>
            <h2 className='text-zinc-500 font-bold text-xl'>Generate Time-Table</h2>
          </div>

          <div className={`generate-time-table cursor-pointer flex space-x-4 ${select1 ? 'selected' : ' '}`} onClick={toggleIsSelected1}>
              <img src={assets.viewtimetable} className='h-7'/>
            <h2 className='text-zinc-500 font-bold text-xl'>View Time-Table</h2>
          </div>

          <div className={`generate-time-table cursor-pointer flex space-x-4 ${select2 ? 'selected' : ' '}`} onClick={toggleIsSelected2}>
              <img src={assets.personicon} className='h-7'/>
            <h2 className='text-zinc-500 font-bold text-xl'>Lecturers Available</h2>
          </div>

          <div className={`generate-time-table cursor-pointer flex space-x-4 ${select3 ? 'selected' : ' '}`} onClick={toggleIsSelected3}>
              <img src={assets.courseicon} className='h-7'/>
            <h2 className='text-zinc-500 font-bold text-xl'>Courses Available</h2>
          </div>

          <div className={`generate-time-table cursor-pointer flex space-x-4 ${select4 ? 'selected' : ' '}`} onClick={toggleIsSelected4}>
              <img src={assets.timeicon} className='h-7'/>
            <h2 className='text-zinc-500 font-bold text-xl'>Time & Schedule</h2>
          </div>

        </div>


      </div>
    </div>
    </>
  )
}

export default Sidebar
