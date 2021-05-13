import { useState, useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    root: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center'
    },
    input: {
        width: 500,
    }

}));

const TableId = () => {
    const classes = useStyles();
    let history = useHistory();
    const loc = useLocation();
    const [userId, setUserId] = useState([])

    const formik = useFormik({
        initialValues: {
            email: 'foobar@example.com',
            password: 'adminadmin',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            history.push("/table");
            console.log(JSON.stringify(values, null, 2));
        },
    });


    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${loc.pathname.slice(7)}`)
            .then((response) => response.json())
            .then((data) => setUserId(data))
            .catch((error) => console.log(error.message));
    }, []);

    const {company, address, ...users} = userId
    
    const result = Object.entries(users).map((item, i) => {
        return <TextField
            className={classes.input}
            key={i++}
            id={item[0]}
            label={item[0]}
            defaultValue={item[1]}
            InputProps={{
                readOnly: false,
            }} />
    })

    return (
        <>
            <h2 className={classes.title}>User: {userId.name}</h2>
            <div className={classes.paper}>
                <form className={classes.root} onSubmit={formik.handleSubmit}>
                    {result}
                    <Button type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Change
                    </Button>
                </form>
            </div>
        </>
    )
}

export default TableId;