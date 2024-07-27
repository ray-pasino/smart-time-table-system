import React, { useState } from 'react'
import './CreateTimeTable.css'

const CreateTimeTable = () => {

    const [closed, setClosed] = useState(false)
    const [opened, setOpened] = useState(false)

    const togglemodal = ()=>{
        setClosed(true)
        setOpened(true)
    }

  return (
    <div className={`${closed ? 'hidden' : ' '}`}>
    <div className='createtimetable-shadow' onClick={togglemodal}></div>
    <div className='createtimetable mt-8'>
        <h1 className='heading'>TIMETABLE</h1>
    </div>
    </div>
  )
}

export default CreateTimeTable