import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Input from "../components/input/input";
import Button from "../components/button/button";
import Data from '../Api/api';



const Register = () => {
  const textName = 'Nome Completo*';
  const textEmail = 'E-mail*';
  const textPassword = 'Senha*';
  const typeInput = 'text';
  const typeInputPassword = 'password';
  const typeInputRadio = 'radio';

  const [values, setValues] = useState({
    name: '',
    email:'',
    password:'',
    role: '',
    restaurant: 'Burguer Queen',
  }, console.log('entrou'));
 
  const [errors, setError] = useState({
    name:'',
    email:'',
    password:'',
    role: '',
    restaurant: '',
  });

  const validation = () => { 
    let error = {}
    error.isFormValid = true

    if (!values.name){
      error.name = 'Preencha seu nome corretamente';
      error.isFormValid = false
    }

    if (!values.email) {
      error.email = "Por favor preencha o email";
      error.isFormValid = false
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      error.email = 'Preencha seu e-mail corretamente';
      error.isFormValid = false
    } 

    if (!values.password) {
      error.password = 'Preencha sua senha corretamente';
      error.isFormValid = false
    }
    
    else if (values.password.length < 6) {
      error.password = 'Insira no mínimo 6 caracteres';
      error.isFormValid = false
    }

    if((values.role !== "atendente" && values.role !== "cozinha")) {
      error.role = "Selecione uma função"
      error.isFormValid = false
    }
    
    return error;
  }
  const history = useHistory();
  const Login = () => {
    history.push('/Login')
  }

  const handleSubmit = e => {
    e.preventDefault();
    const valid = validation() 
    console.log(values)
    
    setError(valid)
    
    if (valid.isFormValid){
      Login();
      Data(values, "users", "POST")
    }
  }


  const handleChange = e => {  
    const { name, value } = e.target;
    console.log(e.target.value)
    setValues({
        ...values,
        [name]: value,
    })
  
  }

  useEffect(() => {
    console.log(values)
  }, [values] )
  
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <Input
          name='name'
          placeholder={textName} 
          type={typeInput}
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>} 
  
        <Input 
          name='email'
          placeholder={textEmail} 
          type={typeInput}
          value={values.email}
          onChange={handleChange}
        />
         {errors.email && <p>{errors.email}</p>} 

        <Input 
          name='password'
          placeholder={textPassword} 
          type={typeInputPassword}
          value={values.password}
          onChange={handleChange}
          
        />
        {errors.password && <p>{errors.password}</p>} 
        <section  >
          <Input
            name='role'
            id='hall'
            type={typeInputRadio} 
            value ='atendente'
            onChange={handleChange}
          />
          <Input 
            name='role'
            id= 'kitchen'
            type={typeInputRadio}
            value='cozinha'
            onChange={handleChange}
            
            
          />
        </section>
        {errors.role && <p>{errors.role}</p>}

        <Button variant='primary' type='submit' >
          Entrar e Logar
        </Button>
      </form>
    </div>
  )
  
}

export default Register; 