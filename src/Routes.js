import { 
  BrowserRouter as Router, Route, Switch, 
} from 'react-router-dom';
import Home from './Pages/Home'
import Login from './Pages/Login';
import Register from './Pages/Register';


function App() {
  return (
    <Router>
      <Switch> 
        <Route path="/" exact component={Home}/>
        <Route path="/Login" component={Login}/>
        <Route path="/Register" component={Register}/>
      </Switch>
    </Router>
  );
}

export default App;
