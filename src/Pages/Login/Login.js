import Input from "../../components/input/input";
import Button from "../../components/button/button";
import LogoImg from "../../components/img/img";
import "../../Styles/login.scss"

const Login = () => {
  const textEmail = 'E-mail*'
  const textPassword = 'Senha*'
  const typeInputEmail = 'email'
  const typeInputPassword = 'password'

  return (
    <div>
      <LogoImg />
      <Input
        placeholder={textEmail}
        type={typeInputEmail}
      />

      <Input
        placeholder={textPassword}
        type={typeInputPassword}
      />

      <Button
        variant="secundary"
        // onClick={Cozinha/Salão}
      >
        Entrar
      </Button>
    </div>
  )
}

export default Login
