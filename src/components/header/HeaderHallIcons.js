import React from "react";
import './style.css';

const HeaderIcons = ({img, onClick}) => {
  return(
    <header className="header">
       <ol className="order-area">
          <div className="buttons-menu">

            <button className="btn-menu" onClick={onClick}>
              <img src={img} alt="" className='img-menu'/>
            </button>

          </div> 
       </ol>
    </header>
  )
}

export default HeaderIcons;
