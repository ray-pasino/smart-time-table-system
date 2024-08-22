import React, {useState} from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './Coursesavailable.css'
import Adminheader from '../../components/Adminheader/Adminheader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


const Coursesavailable = () => {

  const [Cclicked, setCclicked] = useState(false)

  const handleClicked = ()=>{
    setCclicked(true)
  }

    const handleClosed = () =>  setCclicked(false)
  return (
    <div className='Coursesavailable'>
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
              <p>Add New Course</p>
            </div>
          </div>

          {/* list courses */}

        </div>
        </div>
       

        {Cclicked &&
      
      
      <>
      <div className='modal-shadow' onClick={handleClosed}></div>
      <div className="add-course-modal rounded-md">
      <div className="add-course-modal-title font-bold text-center text-2xl text-white p-4">ADD COURSE</div>
      <form className="modal-body p-6 space-y-10">

        <div className="lecturer-id flex flex-col text-xl">
          <label htmlFor="course-id">Course Code</label>
          <input type="text" className='course-input bg-inherit rounded-xl'/>
        </div>

        <div className="Course flex flex-col text-xl">
          <label htmlFor="course">Course</label>
          <input type="text" className='course-input bg-inherit rounded-xl'/>
        </div>

        <div className="Lecturer flex flex-col text-xl">
          <label htmlFor="Lecturer">Lecturer</label>
          <input type="text" className='course-input bg-inherit rounded-xl'/>
        </div>

        <div className="Credit-hours flex flex-col text-xl">
          <label htmlFor="credit-hours">Credit Hours</label>
          <input type="number" className='course-input bg-inherit rounded-xl'/>
        </div>



        <div className="flex mx-20 space-x-40 text-white font-bold button-case">
                  <button className='cancel rounded-md p-2 w-40'onClick={handleClosed} >Cancel</button>
                  <button className='generate rounded-md p-2 w-40'>Add Course</button>
        </div>

      </form>
      </div>
      </>
  }
      </div>
    </div>
  )
}

export default Coursesavailable
