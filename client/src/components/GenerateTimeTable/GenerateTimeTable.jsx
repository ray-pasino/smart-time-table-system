import React, { useState } from 'react'
import './GenerateTimeTable.css'
import CreateTimeTable from '../createTimeTable/CreateTimeTable'


const GenerateTimeTable = () => {
  const [opened, setOpened] = useState(false)
  
  const handlesetOpened = () =>{
    setOpened(true)
  }
  return (
    <>
          {opened ? <CreateTimeTable handlesetOpened={handlesetOpened}/> : <></>}
    <div className='GenerateTimeTable p-4'>
        <h1 className='text-b-blue text-2xl font-bold mb-4'>WELCOME ADMINISTRATOR</h1>
        <div className="btn-container p-4">
        <button className='Btn text-white p-2' onClick={handlesetOpened}>CREATE NEW TIMETABLE</button>
        </div>
    </div>
    </>
  )
}

export default GenerateTimeTable