import * as React from "react";
import '../styles/Header.css';
import logoUrl from '../img/icons.png';
import logoUrll from '../img/icons-rice.png';
import logoUrlll from '../img/icons-pizza.png';


function onPageload() {
  return(
    <div className="eader">
    
      <h4> 
        <img src={logoUrl} alt="" className="icon"/>  
        <a href="#" className="cen">Food Vision 101</a> 
        <img src={logoUrll} alt="" className="iconic"/>
        {/* <img src={logoUrlll} alt="" className="iconicc"/> */}
      </h4>
  </div>
  )
}

function onPrediction() {
  return(
    <div className="eader">
    
      <h5> 
        <img src={logoUrl} alt="" className="iconicc"/> 
        <a href="#" className="cen">Image Prediction Results</a> 
        </h5>
  </div>
  )
}

function Header({ prediction }){
  if (prediction === false){
    return onPageload()
  }
  if(prediction === true){
    return onPrediction()
  }
}

export default Header;
