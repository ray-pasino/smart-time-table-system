import React, { useState} from 'react'
import './CreateTimeTable.css'



const CreateTimeTable = ({handleClose}) => {

  return (
    <div className={`${closed ? 'hidden' : ' '}`}>
    <div className='createtimetable-shadow' onClick={handleClose}></div>
    <div className='createtimetable mt-8 rounded-md'>
        <h1 className='heading h-14 text-white font-bold text-xl'>TIMETABLE</h1>
    
        <form className='create-time-table-form ms-8 mt-8 space-y-4'>
          <div className='form-input-box'>
          <label htmlFor="course" className='block'>Course</label>
          <input type="text" className='rounded-md' required/>
          </div>

    
          <div className='form-input-box'>
          <label htmlFor="course" className='block'>Lecturer</label>
          <input type="text" className='rounded-md' required/>
          </div>


          <div className='form-input-box'>
          <label htmlFor="course" className='block'>Venue</label>
          <input type="text" className='rounded-md' required/>
          </div>

          <div className='form-input-box'>
          <label htmlFor="course" className='block'>Date & Time</label>
          <input type="datetime-local" className='rounded-md' required/>
          </div>

          <div className='form-input-box'>
          <label htmlFor="course" className='block'>Meeting Status</label>
          <select name="meeting-status" className='p-4 rounded-md bg-inherit w-60 md:w-80'>
            <option value="In-person">In-person</option>
            <option value="Virtual">Virtual</option>
          </select>
          </div>

          <div className='float-right me-4'>

          <button className='font-semibold bg-b-blue rounded-md text-white p-2'>Create Timetable</button>
          </div>

        </form>
    </div>
    </div>
  )
}

export default CreateTimeTable