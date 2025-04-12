import React from 'react'
import Logo from '../../assets/Logo.png'
import './image.css'
  
const image = () => {
  return (
    <div className='ImageA'>
    <div id='logo'>
      <p><img src={Logo} alt='Logo Image'/></p>
    </div>
    </div>
  )
}

export default image