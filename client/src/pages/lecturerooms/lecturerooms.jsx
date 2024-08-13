
import React, { useState } from 'react'
import './lecturerooms.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Adminheader from '../../components/Adminheader/Adminheader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


const Lecturerooms = () => {

  const [clicked, setClicked] = useState(false)

  const handleClicked = ()=>{
    setClicked(true)
  }

    const handleClosed = () =>  setClicked(false)

  return (
    <div className='lecturerooms'>
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
              <p>Add New Room</p>
            </div>

          </div>
        </div>
        </div>





      {clicked &&
      
      
          <>
          <div className='modal-shadow' onClick={handleClosed}></div>
          <div className="add-room-modal rounded-md">
          <div className="add-room-modal-title font-bold text-center text-2xl text-white p-4">ADD LECTURE ROOM</div>
          <form className="modal-body p-6 space-y-10">

            <div className="room-name flex flex-col text-xl">
              <label htmlFor="room-name">Room Name</label>
              <input type="text" className='room-input bg-inherit rounded-xl'/>
            </div>


        <div className="flex space-x-40 text-white font-bold button-case">
                  <button className='cancel rounded-md p-2 w-40'onClick={handleClosed} >Cancel</button>
                  <button className='generate rounded-md p-2 w-40'>Add Room</button>
        </div>


          </form>
          </div>
          </>
      }
       
      </div>
    </div>
  )
}

export default Lecturerooms
