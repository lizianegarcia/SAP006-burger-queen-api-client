import React from "react";
import './style.css'; 

const Button = ({variant, children, onClick, type}) => {
    const classes = `button ${variant}`;

    return (
        <button className = {classes} onClick={onClick} type={type} >
            {children}
        </button>
    )
}

export default Button;
