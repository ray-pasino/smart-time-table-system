import React from 'react'
import './Administrator.css'
import Adminheader from '../../components/Adminheader/Adminheader'
import Nfooter from '../../components/n-footer/Nfooter'

const Administrator = () => {
  return (
    <div>
      <Adminheader/>

      <h1>hello admin</h1>
    <div className='warning md:hidden'>

      WORK ON YOUR DESKTOP PLEASE 

      ADMINISTRSTOR PANEL ACCESS HAS BEEN RESTRICTED FOR MOBILE DEVICES
    </div>

      <Nfooter/>
    </div>
  )
}

export default Administrator
