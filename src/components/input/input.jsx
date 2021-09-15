import React from "react";
// import Img from "../img";

const Input = ({name, placeholder, type, inputValue, handleChange}) => {
    
    return (
            <input 
            name = {name}
            placeholder={placeholder} 
            type={type} 
            value ={inputValue} 
            onChange={handleChange} />   
    )
}

export default Input;