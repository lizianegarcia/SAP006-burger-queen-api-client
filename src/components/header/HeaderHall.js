import React from "react";
import './style.css';
import home from "../../assets/icons/home.png";
import pendentes from "../../assets/icons/pendentes.png";
import prontos from "../../assets/icons/prontos.png";
import logout from "../../assets/icons/logout.png";
import { useHistory } from "react-router";

const HeaderHall = () => {
 const history = useHistory();

 const Home = () => {
  history.push('/Hall')  
}

 const Pending = () => {
  history.push('/Kitchen')  
}
  const OrderUp = () => {
    history.push('/OrderUp')
  }

  const Logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    history.push('/');
  }
  return(
    <header className="nav-header">
       <ol className="order-menu">
          <div className="buttons-menu">
          <button className="nav-btn-menu"><img src={home} alt="" className='img-menu' onClick={Home}/>
            <label>Home</label>
            </button>
            <button className="nav-btn-menu"><img src={pendentes} alt="" className='img-menu' onClick={Pending}/>
            <label>Pedidos Pendentes</label>
            </button>

            <button className="nav-btn-menu"><img src={prontos} alt="" className='img-menu' onClick={OrderUp}/>
            <label>Pedidos Prontos</label>
            </button>

            <button className="nav-btn-menu"><img src={logout} alt="" className='img-menu' onClick={Logout}/>
            <label>Sair</label>

            </button>

          </div>
       </ol>
    </header>
  )
}

export default HeaderHall;