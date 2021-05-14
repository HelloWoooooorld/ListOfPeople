import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = ({ isAuth, signout }) => {
    const classes = useStyles();
    let history = useHistory();

    const toLogin = () => {
        history.push("/login");
    }

    const toTable = () => {
        history.push("/table");
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    ></IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/">User App</Link>
                    </Typography>
                    <Router>
                        {isAuth ? (
                            <>
                                <Button color="inherit" onClick={signout}>
                                    <Link to="/">Logout</Link>
                                </Button>
                                <Button color="inherit" onClick={toTable} >
                                    Table
                                </Button>
                            </>
                        ) : (

                            <Button color="inherit" onClick={toLogin}>
                                Login
                            </Button>

                        )}
                    </Router>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
