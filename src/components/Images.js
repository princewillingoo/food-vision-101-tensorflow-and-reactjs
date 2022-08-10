import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import '../styles/images.css';

const Images = ({ imageURLs, removeImage, identify, imageRef}) => { 
    return (
        imageURLs.map((imageSrc, i) =>
        <div key={i} className='fadein'>
            <div onClick={() => removeImage(imageSrc.public_id)} className='delete'>
                <FontAwesomeIcon icon={faTimesCircle} size='2x' />
            </div> 
            <img src={imageSrc} alt="" ref={imageRef}/>)
            <div>
            <button className="bn29" onClick={identify}>Classify Image</button>
            </div>
            
        </div>
        )
    )
}

export default Images

// A little more interesting here, we are passing in the images as a prop and then mapping over those images 
// to produce the required jsx. But this is still pretty bland. Lets take a peek at our final presentation 
// component, Buttons.js, and then we can move into the real action.