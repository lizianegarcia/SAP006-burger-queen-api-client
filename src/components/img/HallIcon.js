import React from "react";
import Salao from "../../assets/icons/Salao.png";
import "./styles.css";


const HallIcon = () => {
  return(
      <img 
            className="icon" 
            src={Salao} 
            alt="Ícone garçom" 
        />
  )
}

export default HallIcon;