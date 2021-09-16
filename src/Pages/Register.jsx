import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Input from "../components/input/input";
import Button from "../components/button/button";



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
    occupation: '',
  }, console.log('entrou'));

  const [errors, setError] = useState({
    name:'',
    email:'',
    password:'',
    occupation: '',
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

    if((values.occupation !== "atendente" && values.occupation !== "cozinha")) {
      error.occupation = "Selecione uma função"
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
    setError(valid)
    if (valid.isFormValid){
      Login();
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
    console.log('caiu aqui')
  }, [])
  useEffect(() => {
  console.log(values, errors)
  }, [values, errors] ) 
  // useEffect( async () => {
  //   const response = await fetch('https://lab-api-bq.herokuapp.com/users')
  //   const data = await response.json();
  // }, []) jasonStringfi

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <Input
          name='name'
          placeholder={textName} 
          type={typeInput}
          alue={values.name}
          handleChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>} 
  
        <Input 
          name='email'
          placeholder={textEmail} 
          type={typeInput}
          value={values.email}
          handleChange={handleChange}
        />
         {errors.email && <p>{errors.email}</p>} 

        <Input 
          name='password'
          placeholder={textPassword} 
          type={typeInputPassword}
          value={values.password}
          handleChange={handleChange}
          
        />
        {errors.password && <p>{errors.password}</p>} 
        <section  >
          <Input
            name='occupation'
            id='hall'
            type={typeInputRadio} 
            value ='atendente'
            handleChange={handleChange}
          />
          <Input 
            name='occupation'
            id= 'kitchen'
            type={typeInputRadio}
            value='cozinha'
            handleChange={handleChange}
            
            
          />
        </section>
        {errors.occupation && <p>{errors.occupation}</p>}

        <Button variant='primary' type='submit' >
          Entrar e Logar
        </Button>
      </form>
    </div>
  )
  
}

export default Register; 