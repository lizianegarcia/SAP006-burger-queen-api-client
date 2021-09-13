import { useHistory } from "react-router-dom";
import Button from "../components/button/button";
import Img from "../components/img/img"

const Home = () => {
  const history = useHistory();
  const Login = () => {
    history.push('/Login')
  }
  const Register = () => {
    history.push('/Register')
  }

  return (
    <div>
      <Img src=""> </Img>
      <Button onClick={Login}>Login</Button>
      <Button onClick={Register}>Cadastro</Button>
    </div>

  );
}

export default Home;