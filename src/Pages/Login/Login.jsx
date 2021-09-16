import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import LogoImg from "../../components/img/img";
import "../../Styles/login.css";

const Login = () => {
  const textEmail = 'E-mail*'
  const textPassword = 'Senha*'
  const typeInputEmail = 'email'
  const typeInputPassword = 'password'

  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [errors, setError] = useState({
    email: '',
    password: '',
  })

  const validation = () => {
    let errors = {}
    if (!values.email) {
      errors.email = "Por favor preencha o email";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
       errors.email = "Preencha seu e-mail corretamente";
    } 
  
    if (!values.password) {
      errors.password = "Preencha sua senha corretamente";
    }  else if (values.password.length < 6) {
    errors.password = "Sua senha contém no mínimo 6 caracteres"
    }

    return errors;
  }

  const handleChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    const valid = validation()
    setError(valid)
  }

  return (
    <div className="form-content-right">
      <LogoImg className="logo" />
      <form className="form" onSubmit={handleSubmit}>
        <h1> LOGIN </h1>
        <div className="form-inputs">
          <label htmlFor="email" className="label-form">
           E-mail
          </label>
          <Input className="form-input"
            name="email"
            placeholder={textEmail} 
            type={typeInputEmail}
            value ={values.email} 
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>} 
        </div>
        <div className="form-inputs">
          <label htmlFor="password" className="label-form">
            Senha
          </label>
          <Input className="form-input"
            name="password"
            placeholder={textPassword} 
            type={typeInputPassword} 
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>} 
        </div>
        <Button variant="secundary" className="form-input-btn" type="submit" 
        // onClick={Cozinha/Salão}
        > 
        Login 
        </Button>
        <span className="form-input-login">
          Ainda não tem uma conta? 
          <Link to="/Register">Cadastre-se</Link>
        </span>
      </form>
    </div>
  )
}
 
export default Login
