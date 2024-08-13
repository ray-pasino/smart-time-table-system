import React, {useState} from 'react'
import './Classes.css'
import Sidebar from '../../components/sidebar/Sidebar'
import './Classes.css'
import Adminheader from '../../components/Adminheader/Adminheader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Classes = () => {

  const [Clclicked, setClClicked] = useState(false)

  const handleClicked = ()=>{
    setClClicked(true)
  }

    const handleClosed = () =>  setClClicked(false)


  return (
    <div>
       <div className='flex'>
        <Sidebar/>
        <div className="right">
        <Adminheader/>           
        <div className="dashboard-info m-5">
          <div className="dashboard-title text-b-blue font-bold text-3xl mb-8">WELCOME ADMINISTRATOR</div>

          <div className="small-title-container p-3 rounded-xl flex justify-between">
            <div className="search-container flex text-white w-60 p-1 space-x-2 rounded-xl">
                  <input type="text" placeholder='Search' className='search-input w-60 h-10 bg-inherit text-xl' />
                 <FontAwesomeIcon icon={faSearch} className='mt-2 search-icon text-2xl'/>
            </div>

            <div className="add-room rounded-xl text-white text-xl font-bold p-2 shadow-md cursor-pointer" onClick={handleClicked}>
              <p>Add New Class</p>
            </div>

          </div>
        </div>
        </div>
       


        {Clclicked &&
      
      
      <>
      <div className='modal-shadow' onClick={handleClosed}></div>
      <div className="add-room-modal rounded-md">
      <div className="add-room-modal-title font-bold text-center text-2xl text-white p-4">ADD NEW CLASS</div>
      <form className="modal-body p-6 space-y-10">

        <div className="room-name flex flex-col text-xl">
          <label htmlFor="room-name">Class Name</label>
          <input type="text" className='room-input bg-inherit rounded-md h-6'/>
        </div>

        <div>
          <h2 className='text-2xl'>Courses <span className='font-bold text-4xl cursor-pointer'>+</span> </h2>
        </div>

        <div className='flex space-x-4'>

            <div className='flex flex-col'>
              <p>Course</p>
              <select className='bg-inherit border border-black rounded-md p-2'>
              <option value="">Select a course</option>
              <option value="">Data Structures</option>
              </select>
            </div>

            <div className='flex flex-col'>
              <p>Academic Period</p>
              <select className='bg-inherit border border-black rounded-md p-2'>
              <option value="">Select an academic period</option>
              <option value="">First Semester</option>
                <option value="">Second Semester</option>
              </select>
            </div>

            <div className='flex flex-col'>
              <p>Meetings Per Week</p>
              <select className='bg-inherit border border-black rounded-md p-2'>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
            </div>

        </div>

            <div className='flex flex-col'>
            <label htmlFor="population">Population</label>
            <input type="text" className='room-input bg-inherit rounded-md h-6'/>
            </div>

            <div className='flex flex-col'>
            <label htmlFor="population">Unavailable Lecture Rooms</label>
            <input type="text" className='room-input bg-inherit rounded-md h-6'/>
            </div>

    <div className="flex space-x-40 text-white font-bold button-case">
              <button className='cancel rounded-md p-2 w-40'onClick={handleClosed} >Cancel</button>
              <button className='generate rounded-md p-2 w-40'>Add Class</button>
    </div>


      </form>
      </div>
      </>
  }

      </div>
    </div>
  )
}

export default Classes
