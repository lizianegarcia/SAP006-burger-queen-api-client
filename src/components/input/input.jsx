import React from "react";


const Input = ({name, id, placeholder, type, defaultValue, onChange}) => {
    
    return (
            <input 
            name={name}
            id={id}
            placeholder={placeholder} 
            type={type} 
            defaultValue ={defaultValue} 
            onChange={onChange} />   
    )
}

export default Input;