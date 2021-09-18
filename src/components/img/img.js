import React from "react";
import logo from "../../assets/images/logo.png"
import { Cozinha, Salao } from "../../assets/icons/Cozinha.png"
import "./styles.css"

const LogoImg = () => {  
return (
    <header className="header">
          <img 
              className="responsive center" 
              src={logo} 
              alt="Logo Burguer Queen" 
          />
      </header>
)
}

const KitchenIcon = () => {
    <div>
        <img 
              className="icon" 
              src={Cozinha} 
              alt="Ícone cozinha" 
          />
    </div>
}

const HallIcon = () => {
    <div>
        <img 
              className="icon" 
              src={Salao} 
              alt="Ícone garçom" 
          />
    </div>
}

export default {
    LogoImg,
    KitchenIcon,
    HallIcon,
};