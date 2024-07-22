import {React, useState} from 'react'
import './index.css'
import {Route, Routes, useLocation} from 'react-router-dom'
import Lecturerlogin from './pages/lecturerlogin/Lecturerlogin'
import Studentlogin from './pages/studentlogin/Studentlogin'
import Login from './components/login/Login'
import Footer from './components/footer/Footer'
import BannerInfo from './components/bannerInfo/BannerInfo'
import Verifylecturer from './pages/Verifylecturer/Verifylecturer'
import Verifystudent from './pages/verifystudent/Verifystudent'
import Header from './components/Header/Header'


const App = () => {

  const [isClicked, setIsClicked] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false); 

  const location = useLocation()

  const showBanner = location.pathname === '/' ||
                     location.pathname === '/studentlogin' ||
                     location.pathname === '/lecturerlogin'

  return (
    <div className='md:flex'>
      
      {showBanner ? <BannerInfo/> : <Header/> }

      
    <Routes>
      <Route path ='/' element={<Login/>}/>
      <Route path='/studentlogin' element={<Studentlogin/>}/>
      <Route path='/lecturerlogin' element={<Lecturerlogin/>}/>
      <Route path='/verifystudentinfo' element={<Verifystudent isClicked={isClicked} setIsClicked={setIsClicked} isClicked2={isClicked2} setIsClicked2={setIsClicked2}/>}/>
      <Route path='/verifylecturerinfo' element={<Verifylecturer isClicked={isClicked} setIsClicked={setIsClicked} isClicked2={isClicked2} setIsClicked2={setIsClicked2}/>}/>
    </Routes>
    <Footer/>
    </div>
  )
}

export default App
