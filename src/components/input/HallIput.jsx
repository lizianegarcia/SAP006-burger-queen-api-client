import React from "react";
import "./style.css";


const HallInput = ({name, id, placeholder, type, value}) => {
    
    return (
            <input 
            name={name}
            id={id}
            placeholder={placeholder} 
            type={type} 
            value ={value} />
    )
}

export default HallInput