import {React, useState} from 'react'
import './index.css'
import {Route, Routes, useLocation} from 'react-router-dom'
import Lecturerlogin from './pages/lecturerlogin/Lecturerlogin'
import Studentlogin from './pages/studentlogin/Studentlogin'
import Login from './pages/login/Login'
import BannerInfo from './components/bannerInfo/BannerInfo'
import Verifylecturer from './pages/Verifylecturer/Verifylecturer'
import Verifystudent from './pages/verifystudent/Verifystudent'
import Footer from './components/footer/Footer'
import Administratorlogin from './pages/Administratorlogin/Administratorlogin'
import Verifyadministrator from './pages/Verifyadministrator/Verifyadministrator'
import Administrator from './pages/Administrator/Administrator'



const App = () => {

  const [isClicked, setIsClicked] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false); 
  const [seePassword, setSeePassword] = useState(false)

  const location = useLocation()

  const showBannerandFooter = location.pathname === '/' ||
                     location.pathname === '/studentlogin' ||
                     location.pathname === '/lecturerlogin' ||
                      location.pathname === '/administratorlogin'


  return (
    <div className='md:flex'>
      
      {showBannerandFooter  && <BannerInfo/> }
      
    <Routes>
      <Route path ='/' element={<Login/>}/>
      <Route path='/studentlogin' element={<Studentlogin/>}/>
      <Route path='/lecturerlogin' element={<Lecturerlogin/>}/>
      <Route path='/administratorlogin' element={<Administratorlogin isClicked={isClicked} setIsClicked={setIsClicked} isClicked2={isClicked2} setIsClicked2={setIsClicked2} seePassword={seePassword} setSeePassword={setSeePassword}/>}/>
      <Route path='/verifystudentinfo' element={<Verifystudent isClicked={isClicked} setIsClicked={setIsClicked} isClicked2={isClicked2} setIsClicked2={setIsClicked2}/>}/>
      <Route path='/verifylecturerinfo' element={<Verifylecturer isClicked={isClicked} setIsClicked={setIsClicked} isClicked2={isClicked2} setIsClicked2={setIsClicked2}/>}/>
      <Route path='/verifyadministratorinfo' element={<Verifyadministrator isClicked={isClicked} setIsClicked={setIsClicked} isClicked2={isClicked2} setIsClicked2={setIsClicked2}/>}/>
      <Route path='/administrator' element={<Administrator/>}/>
    </Routes>

    {showBannerandFooter  && <Footer/> }
    </div>
  )
}

export default App
