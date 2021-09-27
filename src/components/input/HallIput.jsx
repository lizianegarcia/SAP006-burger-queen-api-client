import React from "react";
import "./style.css";


const HallInput = ({name, placeholder, type, value, onChange}) => {
    
    return (
            <input className="hall-input"
            name={name}
            placeholder={placeholder} 
            type={type} 
            value ={value}
            onChange={onChange} />
    )
}

export default HallInput