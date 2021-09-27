import React from "react";
import Button from "../../components/button/button";
import "../../Styles/notfound.css";
import { useHistory } from "react-router";
import BackgroundLogo from "../../components/img/BackgroundLogo";


const NotFound = () => {

  const history = useHistory();
  const Login = () => {
    history.push('/Login')
  }

  return (
  <div className="not-found">
    <BackgroundLogo />
    <main className="not-found-main">
      <div className="notfound-404">
        <h1>4 <span>   </span> 4 </h1>
      </div>
      <h2>Oops! A página não foi encontrada...</h2>
      <Button variant="tertiary" onClick={Login} > 
        Voltar ao Login 
      </Button>
    </main>
 </div>


  )
}

export default NotFound;