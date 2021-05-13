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

const Header = ({ isauth, signout }) => {
    const classes = useStyles();

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
                        User App
                    </Typography>
                    <Router>
                        {isauth ? (
                            <>
                                <Button color="inherit" onClick={signout}>
                                    <Link to="/">Logout</Link>
                                </Button>
                                <Button color="inherit" >
                                    <Link to="/table">Table</Link>
                                </Button>
                            </>
                        ) : (
                            <Button color="inherit">
                                <Link to="/login">Login</Link>
                            </Button>
                        )}
                    </Router>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
