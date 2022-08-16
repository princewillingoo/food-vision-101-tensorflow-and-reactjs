import React from 'react'
import '../styles/prediction.scss'

const Prediction = ({ imageURLs, imageRef, results, onChange, fileInputRef, triggerUpload, inferenceTime }) => { 
return (
    <div className="App">
        {/* <h1 className='header' >Image Prediction</h1> */}
        <div className="mainWrapper">
        {/* <!--default html file upload button--> */}
        <input type="file" id="actual-btn" onChange={onChange} capture='camera' ref={fileInputRef} onClick={triggerUpload}/>
        {/* our custom file upload button */}
        <label className='upload' for="actual-btn">Upload New Image</label>
        <input type="file" id="actual-btn" hidden/>
        <div className="imageHolder">
            {imageURLs && <img src={imageURLs} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} />}
        </div>
        <div className="mainContent">
        {/* <span>{inferenceTime}</span> */}
                {results.length > 0 && <div className='resultsHolder'>
                    {results.map((result, index) => {
                        return (
                            <React.StrictMode>
                            <div className='result' key={result.food}>
                                <span className='name'>{result.food}</span>
                                <span className='confidence'>Confidence level: {(result.prob).toFixed(2)}% 
                                {index === 0 && <span className='bestGuess'>Best Guess</span>}</span>
                            </div>
                            </React.StrictMode>
                        )
                    })}
                </div>}
            </div>
        </div>
    </div>
            )
        }

export default Prediction