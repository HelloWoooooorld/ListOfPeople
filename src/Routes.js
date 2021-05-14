import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import Login from './pages/Login/index';
import Home from './pages/Home/index'
import Table from './pages/UserTable/index';
import TableId from './pages/UserId/index'
import Header from './components/header';
import useDialog from './hooks/isAuthHook';


const Routes = () => {
    const [isAuth, toogler] = useDialog();

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            isAuth ? <Component {...props} /> : <Redirect to='/login' />
        )} />
    )

    return (
        <Router>
            <Header isAuth={isAuth} signout={toogler} />
            <Switch>
                <Route exact path='/'  >
                    <Home />
                </Route>
                <Route path='/login'>
                    <Login auth={toogler} />
                </Route>
                <Route path='/table/:id' >
                    <TableId isAuth={isAuth} />
                </Route>
                <PrivateRoute path='/table' component={Table} />
            </Switch>
        </Router>

    )
}

export default Routes;