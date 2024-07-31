import React from 'react'
import './Sidebar.css'
import { assets, sidebardata } from '../../assets/assets'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {


  return (

    <div className='sidebar'>
      <div className="title-container flex justify-center space-x-2 mt-10 mb-28">
      <img src={assets.tiemtableicon} className='h-8'/>
      <div className="sidebar-title text-b-blue font-bold  text-2xl">TIME TABLE</div>
      </div>
      <ul className='SidebarList'>
      {sidebardata.map((val, key)=>{
        return (
        <li key={key} className='row mb-12 mx-2'> 
         <NavLink to={val.link} className={({ isActive }) => (isActive ? 'flex justify-center active-link' : 'flex justify-center')} >
        <div className='icon'><img src={val.icon} className='h-8'/></div>
        <div className='title font-bold my-4'>{val.title}</div>
        </NavLink>
        </li>
      )
      })}
      </ul>
    </div>
  )
}

export default Sidebar
