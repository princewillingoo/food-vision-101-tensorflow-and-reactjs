import React, {useState, useEffect, useRef } from 'react'
import Spinner from './components/Spinner'
import Images from './components/Images'
import Buttons from './components/Buttons'
import Prediction from './components/Prediction'
import Footer from './components/Footer'
import './styles/App.css'
import * as mobilenet from "@tensorflow-models/mobilenet";
// Import @tensorflow/tfjs-core
// import * as tf from '@tensorflow/tfjs-core';
// Adds the WebGL backend to the global backend registry.
import '@tensorflow/tfjs-backend-webgl';
import background from "./img/bck.jpg";
import Header from "./components/Header";



const App = () => {
	const [isModelLoading, setIsModelLoading] = useState(false)
    const [model, setModel] = useState(null)
    const [imageURLs, setImageURLs] = useState([]);
    const [results, setResults] = useState([])
    const [history, setHistory] = useState([])
	const [prediction, setPrediction] = useState(false)
	const [images, setImages] = useState([])


    const imageRef = useRef()
    // const textInputRef = useRef()
    const fileInputRef = useRef()

	const loadModel = async () => {
        setIsModelLoading(true)
        try {
            const model = await mobilenet.load()
            setModel(model)
            setIsModelLoading(false)
        } catch (error) {
            console.log(error)
            setIsModelLoading(false)
        }
    }
	

	const identify = async () => {
		setImages([])
		setPrediction(true)
		console.log("Hope") 
        // textInputRef.current.value = ''
        const results = await model.classify(imageRef.current)
		console.log(results)
        setResults(results)
    }

    const triggerUpload = () => {
        fileInputRef.current.click()
    }

    useEffect(() => {
		setIsModelLoading(true)
        loadModel()
    }, [])


	useEffect(() => {
		if (images.length < 1) return;
		const newImageUrls = [];
		images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
		setImageURLs(newImageUrls);
	}, [images]);
	
	useEffect(() => {
        if (imageURLs) {
            setHistory([imageURLs])
        }
    }, [imageURLs])

	const toastColor = { 
		background: '#505050', 
		text: '#fff' 
	  }	
  
	function onChange(e) {
		// const errs = []
		console.log(...e.target.files) 
		setImages([...e.target.files])
		setPrediction(false)
		if (images.length > 3) {
		  const msg = 'Only 3 images can be uploaded at a time'
		  return this.toast(msg, 'custom', 2000, toastColor)
		  
		//   const types = ['image/png', 'image/jpeg', 'image/gif']
	  
		//   images.forEach(i) => {
	  
		// 	if (types.every(type => file.type !== type)) {
		// 	  errs.push(`'${file.type}' is not a supported format`)
		// 	}
	  
		// 	if (file.size > 150000) {
		// 	  errs.push(`'${file.name}' is too large, please pick a smaller file`)
		// 	}
	  
		// 	formData.append(i, file)
		//   })
	  
		//   if (errs.length) {
		// 	return errs.forEach(err => this.toast(err, 'custom', 2000, toastColor))
		//   }
	  
		//   this.setState({ uploading: true })
		// }
	}
}
  
	function removeImage (id) {
	  setImages(
		  images.filter(image => image.public_id !== id)
	  )
	}

	function onError (id){
		this.toast('Oops, something went wrong', 'custom', 2000, toastColor)
		this.setState({ images: this.filter(id) })
	  }
	  
	const myStyle={
        backgroundImage: `url(${background})`,
		height:'115vh',
		marginTop:'-45px',
		fontSize:'25px',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
	};

	  
	  
	const content = () => {
		switch(true) {
			case isModelLoading:
			  return <Spinner />
			case images.length > 0:
			  return <Images removeImage={removeImage} onError={onError} imageURLs={imageURLs} 
			  fileInputRef={fileInputRef} triggerUpload={triggerUpload} identify={identify} imageRef={imageRef}/>
			case prediction:
				return <Prediction onChange={onChange} imageURLs={imageURLs} imageRef={imageRef} results={results} identify={identify} history={history} setImageURLs={setImageURLs}/>
			default:
			  return <Buttons onChange={onChange} />
		  }
		}
	
		return (

		  <div style={myStyle} className='container'>
			<Header prediction={prediction} />
			<div className='buttons'>
			  { content()}
			</div>
			<Footer />
		  </div>
		)
}
	

export default App