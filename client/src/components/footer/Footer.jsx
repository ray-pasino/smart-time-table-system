import React from 'react'
import './Footer.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebook, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <div className='footer mx-10 text-sm text-center'>

      <ul className="navlinks flex text-xs space-x-2 justify-center">
        <li className="whitespace-nowrap">GCTU</li>
        <li className="whitespace-nowrap">Learning Platform</li>
        <li className="whitespace-nowrap">Library</li>
        <li className="whitespace-nowrap">News</li>
      </ul>

      <ul>
        <li className="whitespace-nowrap">Programmes</li>
      </ul>

      <ul className='social-media-icons flex justify-center space-x-2'>
        <li><FontAwesomeIcon icon={faFacebook}/></li>
        <li><FontAwesomeIcon icon={faTwitter}/></li>
        <li><FontAwesomeIcon icon={faInstagram}/></li>
      </ul>


      <div className="copy-right-text">
        <p>Copyright © 2024 Software</p>
      </div>

    <div className="bottom-text">
      <p>Unit Msquare GCTU All Rights Reserved</p>
    </div>

    </div>
  )
}

export default Footer
