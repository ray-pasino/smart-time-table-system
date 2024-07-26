import React from 'react'
import './Sidebar.css'

const Sidebar = ({isClosing , toggleshowSidebar}) => {
  return (
    <>
    <div className={`${isClosing ? 'fadeShadow' : 'shadow'} w-full h-full hidden sm:block absolute z-10`} onClick={toggleshowSidebar}></div>
    <div className={`sidebar hidden sm:block h-full absolute z-20 ${isClosing ? 'slideout' : ' '}`}>
      <h2 className='text-b-blue font-bold text-center text-2xl'>TIME TABLE</h2>
    </div>
    </>
  )
}

export default Sidebar
