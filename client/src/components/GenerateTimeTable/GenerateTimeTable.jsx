import React, { useState } from 'react'
import './GenerateTimeTable.css'
import CreateTimeTable from '../createTimeTable/CreateTimeTable'
import { assets } from '../../assets/assets'



const GenerateTimeTable = () => {
  const [opened, setOpened] = useState(false)
  
  
  const handlesetOpened = () =>{
    setOpened(true)
  }

  const handleClose = () => {
    setOpened(false);
  };

  return (
    <>
          {opened ? <CreateTimeTable handleClose={handleClose}/> : <></>}
    <div className='GenerateTimeTable p-4'>
        <h1 className='text-b-blue text-2xl font-bold mb-4'>WELCOME ADMINISTRATOR</h1>
        <div className="btn-container p-4">
        <button className='Btn text-white p-2 font-bold' onClick={handlesetOpened}>CREATE NEW TIMETABLE</button>
        </div>
        <img src={assets.clockPhoto} className='block mx-auto mt-4' />
    </div>
    </>
  )
}

export default GenerateTimeTable