import { useHistory } from "react-router-dom";
import Button from "../components/button/button";

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
      <Button onClick={Login}>Login</Button>
      <Button onClick={Register}>Cadastro</Button>
    </div>

  );
}

export default Home;