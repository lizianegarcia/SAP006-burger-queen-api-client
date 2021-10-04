import React from "react";
import './style.css'; 

const ButtonMenu = ({className, src, onClick}) => {
    
    return (
        <button className={className}  onClick={onClick}  >
            <img src={src} alt="" className="img-menu" />
        </button>
    )
}

export default ButtonMenu;

