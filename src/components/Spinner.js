import React from "react";
import '../styles/Spinner.css'
import { StickyBallLoading, LoopCircleLoading} from 'react-loadingg';

const Spinner = () => { 
    return(
    <React.StrictMode>
     {/* <h1 className="topmiddle">FOOD VISION 101</h1> */}
     <h1 className="topbelow">Please Wait, Model's Loding ... </h1>
    <div>
    <LoopCircleLoading size={"large"} />
    </div>
    <div>
    <StickyBallLoading />
    </div>
    </React.StrictMode>  
   
  )
}

export default Spinner