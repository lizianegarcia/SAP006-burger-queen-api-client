import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/button/button";
import LogoImg from "../../components/img/img";
import "../../Styles/home.css";

const Home = () => {
  
  const history = useHistory();
  const Login = () => {
    history.push('/Login')
  }
  const Register = () => {
    history.push('/Register')
  }

  return (
    <div className="home">
      <LogoImg />
      <main className="home-page-main">
        <Button variant='secundary' onClick={Login}>Login</Button>
        <Button variant='secundary' onClick={Register}>Cadastro</Button>
      </main>
    </div>

  );
}

export default Home;