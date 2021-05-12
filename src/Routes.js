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
    const AuthContext = React.createContext(isAuthenticated);
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" exact>
                        {isAuthenticated ?
                            <Redirect to="/" />
                            : <Redirect to="/login" />}
                    </Route>
                    <ProtectedRoute
                        isAuthenticated={isAuthenticated}
                        path="/"
                        logout={logout}
                        component={Header}
                    />
                    {/* <Route path="/user/:id" component={login}/> */}

                </Switch>
            </Router>
        </div>
    );
}

export default Routes;