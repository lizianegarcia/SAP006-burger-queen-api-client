import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register";
import Hall from "../Pages/Hall/Hall";
import Kitchen from "../Pages/Kitchen/Kitchen";
import NotFound from "../Pages/NotFound/NotFound";
import { isAuthenticated } from "../Auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
)

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Login" component={Login} />
        <Route path="/Register" component={Register} />
        

        <PrivateRoute path="/Hall" component={Hall}/>
        <PrivateRoute path="/Kitchen" component={Kitchen}/>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App;
