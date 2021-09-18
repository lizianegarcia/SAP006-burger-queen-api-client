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
    <div>
      <LogoImg />
      <Button variant='secundary' onClick={Login}>Login</Button>
      <Button variant='secundary' onClick={Register}>Cadastro</Button>
    </div>

  );
}

export default Home;