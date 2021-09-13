import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const Login = () => {
    history.push('/Login')
  }
  const Register = () => {
    history.push('/Register')
  }

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#262424',
      }}
    >
       
      <button onClick={Login}>Login</button>
      <button onClick={Register}>Cadastro</button>
    </div>

  );
}

export default Home;