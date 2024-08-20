import React from "react";
import Home from './Home/Home';
import { useLocation } from "react-router-dom";

const Submit=()=>{
    const Location = useLocation();
    const {score} = Location.state || {score: 0};
    
    return(
        <>
           <Home score = {score}/>
        </>
    )
}


export default Submit;

