import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Input from "../components/input/input";
import Button from "../components/button/button";

const Register = () => {
  const textName = 'Nome Completo*';
  const textEmail = 'E-mail*';
  const textPassword = 'Senha*';
  const typeInput = 'text';
  const typeInputPassword = 'password';
  const typeInputCheckbox = 'checkbox';

  const [values, setValues] = useState({
    name: '',
    email:'',
    password:'',
  });

  const [errors, setError] = useState({
    name:'',
    email:'',
    password:'',
  });

  const validation = () => { 
    let error = {}
    
    if (values.name === ''){
      error.name = 'Preencha seu nome corretamente';
    } else {
      error.name = '';
      
    }
    if (!values.email) {
      error.email = "Por favor preencha o email";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      error.email = 'Preencha seu e-mail corretamente';
    } 

    if (!values.password) {
      error.password = 'Preencha sua senha corretamente';
    }
    
    else if (values.password.length < 6) {
      error.password = 'Insira no mínimo 6 caracteres';
    }
  
    return error;
  }

  const handleSubmit = e => {
    e.preventDefault();
    const valid = validation()
    console.log(valid, "validação")
    setError(valid)
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
        ...values,
        [name]: value,
    })
      
  }

  // useEffect( async () => {
  //   const response = await fetch('https://lab-api-bq.herokuapp.com/users')
  //   const data = await response.json();
  // }, []) jasonStringfi

  const history = useHistory();
  const Login = () => {
    history.push('/Login')
  }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <Input
          name='name'
          placeholder={textName} 
          type={typeInput}
          inputValue={values.name}
          handleChange={handleChange}
        />
        {errors?.name && <p>{errors.name}</p>} 
  
        <Input 
          name='email'
          placeholder={textEmail} 
          type={typeInput}
          inputValue = {values.email}
          handleChange={handleChange}
        />
         {errors.email && <p>{errors.email}</p>} 

        <Input 
          name='password'
          placeholder={textPassword} 
          type={typeInputPassword}
          inputValue = {values.password}
          handleChange = {handleChange}
          
        />
        {errors.password && <p>{errors.password}</p>} 

        <Input 
          type={typeInputCheckbox} 
        />

        <Input 
          type={typeInputCheckbox} 
        />
      
        <Button variant='primary' type='submit' onClick = {Login}>
          Entrar e Logar
        </Button>
      </form>
    </div>
  )
  
}

export default Register; 