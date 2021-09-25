import React from "react";
import { useHistory } from "react-router";
import './style.css';
import pendentes from "../../assets/icons/pendentes.png";
import historico from "../../assets/icons/historico.png";
import logout from "../../assets/icons/logout.png";


const HeaderKitchen = () => {
  const history = useHistory();
  const Home = () => {
    history.push('/Kitchen')  
  }

  const Historic = () => {
    history.push('/Historic')
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
            <button className="nav-btn-menu"><img src={pendentes} alt="" className='img-menu' onClick={Home}/>
            <label>Pedidos Pendentes</label>
            </button>

            <button className="nav-btn-menu"><img src={historico} alt="" className='img-menu'onClick={Historic} />
            <label>Histórico de Pedidos</label>
            </button>

            <button className="nav-btn-menu"><img src={logout} alt="" className='img-menu' onClick={Logout}/>
            <label>Sair</label>
            </button>

          </div>
       </ol>
    </header>
  )
}


export default HeaderKitchen;