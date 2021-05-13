import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import Login from './pages/Login/index';
import Home from './pages/Home/index'
import Table from './pages/UserTable/index';
import TableId from './pages/TableId/index'
import Header from './components/header';
import {useState} from 'react'

const Routes = () => {

    const [auth, setAuth] = useState(false)
    const signIn = () => setAuth(true)
    const signOut = () => setAuth(false)


    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            auth ? <Component {...props} /> : <Redirect to='/login' />
        )}

        />
    )

    return (
        <Router>
            <Header isauth={auth} signout={signOut} />
            <Switch>
                <Route exact path='/'  >
                    <Home />
                </Route>
                <Route path='/login'>
                    <Login auth={signIn} />
                </Route>
                <Route path='/table/:id' >
                    <TableId />
                </Route>
                <PrivateRoute path='/table' component={Table} />
            </Switch>
        </Router>

    )
}

export default Routes;