import React from "react";
import background from "../../assets/images/background.png";
import "./styles.css";

const BackgroundLogo = () => {  
  return (
      <header className="header-back">
            <img 
                className="responsive center" 
                src={background} 
                alt="background logo cinza" 
            />
      </header>
  )
}

export default BackgroundLogo;