import React from 'react';
import Button from '../components/button/button.js';
import Input from '../components/input/input.js';


const Register = (props) => {
  const textName = 'Nome Completo*';
  const textEmail = 'E-mail*';
  const textPassword = 'Senha*';
  const typeInputEmail = 'email';
  const typeInputPassword = 'password';
  const typeInputCheckbox = 'checkbox';
  

  return (
      <div className="Register">
          <h1> Burguer Queen</h1>
          <div> 
            <Input 
              placeholder={textName} 
              type= 'text' 
            />

            <Input 
              placeholder={textEmail} 
              type={typeInputEmail}
            />

            <Input 
              placeholder={textPassword} 
              type={typeInputPassword}
            />

            <Input 
              type={typeInputCheckbox} 
            />

            <Input 
              type={typeInputCheckbox} 
            />
          </div>
          
          <Button variant='primary' onClick={() => {
            props.history.push('/login')
          }}>Entrar e logar</Button>
      </div>
  )
}

export default Register;
