import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import '../styles/Button.css'

const Buttons = ({ onChange, fileInputRef, triggerUpload}) => { 
    return (
        <div className='buttons fadeinbutton'>
    
        <div className='button'>
          <label htmlFor='single'>
            <FontAwesomeIcon icon={faImage} color='#3B5998' size='10x' />
          </label>
          <input type='file' id='single' onChange={onChange} accept="image/*" ref={fileInputRef} onClick={triggerUpload} />
          
        </div>
        <h1 className='middle'> Click on icon to Upload Image</h1>
    
        {/* <div className='button'>
          <label htmlFor='multi'>
            <FontAwesomeIcon icon={faImages} color='#6d84b4' size='10x' />
          </label>
          <input type='file' id='multi' onChange={onChange} multiple />
        </div>
     */}
      </div>
)
}

export default Buttons