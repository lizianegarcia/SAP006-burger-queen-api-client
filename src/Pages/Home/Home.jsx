import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/button/button";
import Logo from "../../components/img/Logo";
import "../../Styles/home.css";
import Footer from "../../components/footer/footer";

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
      <Logo />
      <main className="home-page-main">
        <div className="home-buttons">
          <Button variant='secundary' onClick={Login}>Login</Button>
          <Button variant='secundary' onClick={Register}>Cadastro</Button>
        </div>
      </main>
      <Footer />
    </div>

  );
}

export default Home;