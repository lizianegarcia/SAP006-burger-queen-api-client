import React from "react";
import './style.css'; 

const ButtonMenu = ({src, onClick}) => {
    
    return (
        <button className="btn-menu"  onClick={onClick}  >
            <img src={src} alt="" className="img-menu" />
        </button>
    )
}

export default ButtonMenu;

