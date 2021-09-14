import { useHistory } from "react-router-dom";
import Input from "../components/input/input";
import Button from "../components/button/button";

const Register = () => {
  const history = useHistory();
  const Login = () => {
    history.push('/Login')
  }
  const textName = 'Nome Completo*';
  const textEmail = 'E-mail*';
  const textPassword = 'Senha*';
  const typeInputEmail = 'email';
  const typeInputPassword = 'password';
  const typeInputCheckbox = 'checkbox';

  return (
  
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
    
    
      <Button variant='primary' onClick={Login}>
        Entrar e logar
      </Button>
    </div>

  );
}

export default Register;