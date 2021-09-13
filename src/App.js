import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx'
import Register from './pages/register.jsx';

const App = () => {
    return (
        <Router>
          <div>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/cadastro' component={Register} />
            </Switch>  
          </div>
        </Router>

    )
} 

export default App;