import React, {useState} from 'react'
import './Lecturersavailabe.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Adminheader from '../../components/Adminheader/Adminheader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Lecturersavailabe = () => {

  const [Lclicked, setLClicked] = useState(false)

  const handleClicked = ()=>{
    setLClicked(true)
  }

    const handleClosed = () =>  setLClicked(false)

  return (
    <div className='Lecturersavailabe'>
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
              <p>Add New Lecturer</p>
            </div>

          </div>
        </div>
        </div>

        {Lclicked &&
      
      
      <>
      <div className='modal-shadow' onClick={handleClosed}></div>
      <div className="add-lecturer-modal rounded-md">
      <div className="add-lecturer-modal-title font-bold text-center text-2xl text-white p-4">ADD LECTURER</div>
      <form className="modal-body p-6 space-y-10">

        <div className="lecturer-id flex flex-col text-xl">
          <label htmlFor="lecturer-id">Lecturer ID</label>
          <input type="text" className='lecturer-input bg-inherit rounded-xl'/>
        </div>

        <div className="Name flex flex-col text-xl">
          <label htmlFor="Name">Name</label>
          <input type="text" className='lecturer-input bg-inherit rounded-xl'/>
        </div>

        <div className="Course flex flex-col text-xl">
          <label htmlFor="Course">Course</label>
          <input type="text" className='lecturer-input bg-inherit rounded-xl'/>
        </div>

        <div className="Telephone-No flex flex-col text-xl">
          <label htmlFor="Telephone-No">Telephone-No</label>
          <input type="number" className='lecturer-input bg-inherit rounded-xl'/>
        </div>

        <div className="Email flex flex-col text-xl">
          <label htmlFor="Email">Email</label>
          <input type="text" className='lecturer-input bg-inherit rounded-xl'/>
        </div>



        <div className="flex mx-20 space-x-40 text-white font-bold button-case">
                  <button className='cancel rounded-md p-2 w-40'onClick={handleClosed} >Cancel</button>
                  <button className='generate rounded-md p-2 w-40'>Add Lecturer</button>
        </div>

      </form>
      </div>
      </>
  }

      </div>
    </div>
  )
}

export default Lecturersavailabe
