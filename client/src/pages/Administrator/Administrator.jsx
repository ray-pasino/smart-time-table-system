import React from 'react'
import './Administrator.css'
import Adminheader from '../../components/Adminheader/Adminheader'
import Nfooter from '../../components/n-footer/Nfooter'
import GenerateTimeTable from '../../components/GenerateTimeTable/GenerateTimeTable'


const Administrator = ({select = true
  // , select1, select2, select3, select4
}) => {

  const toggleIsSelected = ()   => {
    setisSelected(!select)
    setisSelected1(false)
    setisSelected2(false)
    setisSelected3(false)
    setisSelected4(false)
  }

  const toggleIsSelected1 = ()   => {
    setisSelected1(!select1)
    setisSelected(false)
    setisSelected2(false)
    setisSelected3(false)
    setisSelected4(false)
  }

  const toggleIsSelected2 = ()   => {
    setisSelected2(!select2)
    setisSelected(false)
    setisSelected1(false)
    setisSelected3(false)
    setisSelected4(false)
  }

  const toggleIsSelected3 = ()   => {
    setisSelected3(!select3)
    setisSelected2(false)
    setisSelected(false)
    setisSelected1(false)
    setisSelected4(false)
  }

  const toggleIsSelected4 = ()   => {
    setisSelected4(!select4)
    setisSelected2(false)
    setisSelected(false)
    setisSelected1(false)
    setisSelected3(false)
  }
  return (
    <div>
      <Adminheader/>
      <GenerateTimeTable/>
      <Nfooter/>
    </div>
  )
}

export default Administrator
