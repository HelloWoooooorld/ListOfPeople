import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link,
} from 'react-router-dom';
import Home from './screens/home/index';
import Login from './screens/login/index';
import UserId from './screens/userId/index';
import ProtectedRoute from './components/protect';

function Routes() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };
    return (
        <Switch>
            <Route path="/" exact>
                {isAuthenticated ? (
                    <Redirect to="/login" />
                ) : (
                    <div>
                        <h1>Homepage</h1>
                    </div>
                )}
            </Route>
            <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path="/"
                logout={logout}
                component={Home}
            />
            <Route path="/login" exact component={Login} />
            <Route path="/user/:id" exact component={UserId} />
        </Switch>
    );
}

export default Routes;
