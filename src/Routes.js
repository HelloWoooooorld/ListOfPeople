import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Home from "./screens/home";
import Login from "./screens/login";
import Header from './components/header'

function Routes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            {isAuthenticated ? (
              <Redirect to="/login" />
            ) : (
              <div>
                <h1>Homepage</h1>
                <Link to="/login">Go to secret</Link>
                <button onClick={login}>Log in</button>
              </div>
            )}
          </Route>
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            path="/"
            logout={logout}
            component={Header}
          />
          <Route path="/login" component={login}/>
          {/* <Route path="/user/:id" component={login}/> */}
          
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;