import React, {useState, useEffect, useRef } from 'react'
import Spinner from './components/Spinner'
import Images from './components/Images'
import Buttons from './components/Buttons'
import Prediction from './components/Prediction'
import Footer from './components/Footer'
import './styles/App.css'
// import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from '@tensorflow/tfjs';
// Adds the WebGL backend to the global backend registry.
import '@tensorflow/tfjs-backend-webgl';
import background from "./img/bck.jpg";
import Header from "./components/Header";

const food_classes_og = require("./food_classes.json");

const models = [
	{
	  name: "EfficientNetB1_FoodVision101_27Mb",
	  path: "efficientnetb1_js_model",
	  model: null,
	  loadTime: null,
	}
  ];
  
  // let currentLoadedModelIdx = 0;


const App = () => {
	const [isModelLoading, setIsModelLoading] = useState(false)
    const [model, setModel] = useState(null)
    const [imageURLs, setImageURLs] = useState([]);
	const [pred, setPred] = useState([0])
    const [history, setHistory] = useState([])
	const [prediction, setPrediction] = useState(false)
	const [images, setImages] = useState([])
	const [inferenceTime, setinferenceTime] = useState(null)

    const imageRef = useRef()
    // const textInputRef = useRef()
    const fileInputRef = useRef()

	const food_classes = swap(food_classes_og);

	function swap(json) {
		var ret = {};
		for (var key in json) {
		  ret[json[key]] = key;
		}
		return ret;
	  }

	const loadModel = async () => {
		setIsModelLoading(true)
		try{
			const loadStart = new Date();
			const model = await tf.loadGraphModel(
				process.env.PUBLIC_URL + `/json_model/${models[0].path}/model.json`
				);
				setModel(model)
				setIsModelLoading(false)
				const loadTime = new Date() - loadStart;
				console.log(`Model loaded, took ${loadTime} ms`);
				models[0].loadTime = loadTime;
		}catch (error){
			console.log(error)
            setIsModelLoading(false)
		}
		
	  };

	  const formatPred = ({ pred, food_classes }) => {
		const topPreds = tf.topk(pred, 3, true);

		const topPredsVals = topPreds.values.dataSync();
		const topPredsIndx = topPreds.indices.dataSync();
		
		const predChartData = [];
		topPredsIndx.forEach((predIdx, predNum) => {
		predChartData.push({
			food: food_classes[predIdx],
			prob: Math.round(topPredsVals[predNum] * 1000) / 10,
		});
		});
		//setResults(predChartData)
		console.log(predChartData);
		console.log(inferenceTime);
		return <Prediction onChange={onChange} imageURLs={imageURLs} imageRef={imageRef} results={predChartData} identify={identify} history={history} setImageURLs={setImageURLs} inferenceTime={inferenceTime}/>
		
	  } 
	
	const identify = async () => {
		if (model){
			const newSize = [224, 224]
			setImages([])

			const gantTensor = tf.browser.fromPixels(imageRef.current);
			const blResizeTensor = tf.image.resizeBilinear(
				gantTensor, newSize, true
			)

			const infrStart = new Date();
			const axis = 0
			const imageTensor = tf.expandDims(blResizeTensor, axis)
			console.log(imageTensor.shape);
			const preds = model.predict(imageTensor);
			const infrTime = new Date() - infrStart

			setinferenceTime(infrTime)
			setPred(preds)
			setPrediction(true)
			//const topPreds = tf.topk(pred, 5, true);

			// const topPredsVals = topPreds.values.dataSync();
			// const topPredsIndx = topPreds.indices.dataSync();
		
			// const predChartData = [];
			// topPredsIndx.forEach((predIdx, predNum) => {
			// predChartData.push({
			// 	food: food_classes[predIdx],
			// 	prob: Math.round(topPredsVals[predNum] * 1000) / 10,
			// });
			// });
			// console.log(predChartData);
		}else { await loadModel(); }
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
		///////
		console.log("URLs");
		console.log(setImageURLs);
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
		// console.log(...e.target.files) 
		setImages([...e.target.files])
		setPrediction(false)
		if (images.length > 3) {
		  const msg = 'Only 3 images can be uploaded at a time'
		  return this.toast(msg, 'custom', 2000, toastColor)
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
				return formatPred({ pred, food_classes })// <Prediction onChange={onChange} imageURLs={imageURLs} imageRef={imageRef} results={null} identify={identify} history={history} setImageURLs={setImageURLs}/>
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