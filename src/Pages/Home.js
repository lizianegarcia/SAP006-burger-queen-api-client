import { useHistory } from "react-router-dom";
import button from "../components/button/button";

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
      <button onClick={Login}>Login</button>
      <button onClick={Register}>Cadastro</button>
    </div>

  );
}

export default Home;