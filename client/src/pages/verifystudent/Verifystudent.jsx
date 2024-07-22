import React from 'react'
import './Verifystudent.css'
import { studentInfo } from '../../assets/assests'

const Verifystudent = ({isClicked, setIsClicked, isClicked2, setIsClicked2}) => {


  const toggleclick = () => {
    setIsClicked(!isClicked);
    setIsClicked2(false);
    console.log('yes')
  };

  const toggleclick2 = () => {
    setIsClicked2(!isClicked2);
    setIsClicked(false);
  };

  return (
    <div className='ms-6 mt-4 container'>
      <h2>VERIFY ACCOUNT INFORMATION</h2>

      <div className='info mt-4'>
        <p className='title'>NAME</p>
        <p className='attribute mb-4'>{studentInfo.name}</p>
    
        <p className='title'>INDEX NUMBER</p>
        <p className='attribute mb-4'>{studentInfo.indexnumber}</p>

        <p className='title'>EMAIL</p>
        <p className='attribute mb-4'>{studentInfo.email}</p>

        <p className='title'>FACULTY</p>
        <p className='attribute mb-4'>{studentInfo.faculty}</p>

        <p className='title'>PROGRAMME</p>
        <p className='attribute mb-4'>{studentInfo.program}</p>

        <form className='reset-password-form'>
            <div className="reset-password-container mb-2">
                <div className='ms-4'>
                <div className='heading'>Create A New Password</div>

                <div className="input-container">
                    
                <div className="newpassword mb-4">
                <label htmlFor="newpassword" className='block mb-2'>New Password</label>
                <input onClick={toggleclick} type="password"  name="newpassword" className={isClicked ? 'active-input' : 'input-p'} placeholder='Enter new password' required/>
                </div>

                <div className="confirmpassword">
                <label htmlFor="confirmpassword" className='block m-2'>Confirm Password</label>
                <input onClick={toggleclick2} type="password" name="confirmpassword" className={isClicked2 ? 'active-input' : 'input-p'} placeholder='Confirm new password' required/>
                
                </div>


                </div>
                </div>

            </div>

            <input type="submit" value="Change Password" className='cp-btn font-semibold shadow-lg mb-4'/>
        </form>
      </div>


    </div>
  )
}

export default Verifystudent
