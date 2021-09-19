import React from "react";
import './style.css';
import cafe from "../../assets/icons/cafe.png";
import hamburguer from "../../assets/icons/hamburguer.png";
import extras from "../../assets/icons/extras.png";
import bebidas from "../../assets/icons/bebidas.png";
import cifrao from "../../assets/icons/cifrao.png";


const HeaderIcons = () => {
  return(
    <header className="header">
       <ol className="order-area">
          <div className="buttons-menu">
            <button className="btn-menu"><img src={cafe} alt="" className='img-menu'/></button>

            <button className="btn-menu"><img src={hamburguer} alt="" className='img-menu'/></button>

            <button className="btn-menu"><img src={extras} alt="" className='img-menu'/></button>

            <button className="btn-menu"><img src={bebidas} alt="" className='img-menu'/></button>
            <button className="btn-menu-order"><img src={cifrao} alt="" className='img-menu-order'/></button>
          </div>
       </ol>
    </header>
  )
}

export default HeaderIcons;