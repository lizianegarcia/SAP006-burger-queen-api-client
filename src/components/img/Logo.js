import React from "react";
import logo from "../../assets/images/logo.png";

import "./styles.css";

const Logo = () => {  
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

export default Logo;