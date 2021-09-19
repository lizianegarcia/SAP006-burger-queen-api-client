import React from "react";
import './style.css';
import home from "../../assets/icons/home.png";
import prontos from "../../assets/icons/prontos.png";
import logout from "../../assets/icons/logout.png";

const HeaderHall = () => {
  return(
    <header className="header">
       <ol className="order-menu">
          <div className="buttons-menu">
            <button className="btn-menu"><img src={home} alt="" className='img-menu'/></button>

            <button className="btn-menu"><img src={prontos} alt="" className='img-menu'/></button>

            <button className="btn-menu"><img src={logout} alt="" className='img-menu'/></button>

          </div>
       </ol>
    </header>
  )
}

export default HeaderHall;