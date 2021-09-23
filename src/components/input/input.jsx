import React from "react";


const Input = ({name, id, placeholder, type, value, onChange, min, max}) => {
    
    return (
        <input 
            name={name}
            id={id}
            placeholder={placeholder} 
            type={type} 
            value ={value} 
            onChange={onChange}
            min={min}
            max={max}
        />   
            
    )
}

export default Input;