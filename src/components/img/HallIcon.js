import React from "react";
import Salao from "../../assets/icons/Salao.png";
import "./styles.css";


const HallIcon = () => {
  return(
  <div>
      <img 
            className="icon" 
            src={Salao} 
            alt="Ícone garçom" 
        />
  </div>
  )
}

export default HallIcon;