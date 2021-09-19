import React from "react";
import Cozinha from "../../assets/icons/Cozinha.png";
import "./styles.css";


const KitchenIcon = () => {
  return (
      <div>
          <img 
          className="icon" 
          src={Cozinha} 
          alt="Ícone cozinha" 
          />
      </div>
  )
}

export default KitchenIcon;