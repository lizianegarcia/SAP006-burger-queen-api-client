import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import LogoImg from "../../components/img/img";
// import Kitchen from "../Kitchen/Kitchen";
import "../../Styles/login.css";
import { loginEmailAndPassword } from "./Validation";

const Login = () => {
  const textEmail = 'E-mail*'
  const textPassword = 'Senha*'
  const typeInputEmail = 'text'
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
    errors.isFormValid = true

    if (!values.email) {
      errors.email = "Por favor preencha o email";
      errors.isFormValid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Preencha seu e-mail corretamente";
      errors.isFormValid = false;
    } 
  
    if (!values.password) {
      errors.password = "Preencha sua senha corretamente";
      errors.isFormValid = false;
    }  else if (values.password.length < 6) {
      errors.password = "Sua senha contém no mínimo 6 caracteres"
      errors.isFormValid = false;
    }

    return errors;
  }

  const handleChange = e => {
    const { name, value } = e.target
    console.log(e.target.value)
    setValues({
      ...values,
      [name]: value
    })
  }

  const history = useHistory();
  const Kitchen = () => {
    history.push('/Kitchen')
  }

  const Hall = () => {
    history.push('/Hall')
  }

  const handleSubmit = e => {
    e.preventDefault();
    const valid = validation()
    setError(valid)
    if (valid.isFormValid){
      loginEmailAndPassword(values.email, values.password)
      .then(res => res.json())
      .then((json) => {
        const { token } = json
        const { id } = json
        const tokenUser = localStorage.setItem('token', token);
        const idUser = localStorage.setItem('id', id);

        if (tokenUser !== null && idUser !== null &&  json.role === 'atendente') {
          Hall()
        } else if (tokenUser !== null && idUser !== null &&  json.role === 'cozinha') {
          Kitchen()
        } else {
          alert('Não cadastrado!')
        }
      })
    }
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
            defaultValue={values.email} 
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
            defaultValue={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>} 
        </div>
        <Button variant="secundary" className="form-input-btn" type="submit" 
        // onClick={Kitchen}
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
