import * as React from "react";
import '../styles/Header.css';
import logoUrl from '../img/icons.png';
import logoUrll from '../img/icons-rice.png';
import logoUrlll from '../img/icons-pizza.png';


function onPageload() {
  return(
    <div className="eader">
    <img src={logoUrl} alt="" className="icon"/>
    <a href="#" className="cen"><h4> Food Vision 101 </h4></a>
    <img src={logoUrll} alt="" className="iconic"/>
    <img src={logoUrlll} alt="" className="iconicc"/>
  </div>
  )
}

function onPrediction() {
  return(
    <div className="eader">
    <img src={logoUrl} alt="" className="iconicc"/>
    <a href="#" className="cen"><h5> Image Prediction Results </h5></a>
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
