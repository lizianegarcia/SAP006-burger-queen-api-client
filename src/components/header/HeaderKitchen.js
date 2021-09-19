import React from "react";
import './style.css';
import pendentes from "../../assets/icons/pendentes.png";
import historico from "../../assets/icons/historico.png";
import logout from "../../assets/icons/logout.png";

const HeaderKitchen = () => {
  return(
    <header className="header">
       <ol className="order-menu">
          <div className="buttons-menu">
            <button className="btn-menu"><img src={pendentes} alt="" className='img-menu'/></button>

            <button className="btn-menu"><img src={historico} alt="" className='img-menu'/></button>

            <button className="btn-menu"><img src={logout} alt="" className='img-menu'/></button>

          </div>
       </ol>
    </header>
  )
}

export default HeaderKitchen;