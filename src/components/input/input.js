import React from 'react'
// import Img from "../img";

const Input = (props) => {
    
    return (
        <div>
            <input placeholder={props.placeholder} type= {props.type} />   
        </div>  
    )
}

export default Input;