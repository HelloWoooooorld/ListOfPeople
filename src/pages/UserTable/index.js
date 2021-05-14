import { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import HeaderTitle from './components/header';
import TableData from './components/tableData';

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 400,
    },
});

const UserTable = () => {
    const classes = useStyles();
    let history = useHistory();


    const [users, setUsers] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [sortedField, setSortedField] = useState('')

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.log(error.message));
    }, []);

    const createData = (id, name, username, email, phone, website) => {
        return { id, name, username, email, phone, website };
    }

    const handleClick = (id) => history.push(`table/${id}`);

    const rows = users.map(item => createData(item.id, item.name, item.username, item.email, item.phone, item.website))

    function handleSort(field) {
        field = field.toLowerCase();
        console.log(field)
        if (Number.isInteger(users[0][field])) {
            users.sort((a, b) => {
                if (isFiltered) {
                    return a.id - b.id;
                } else {
                    return b.id - a.id;
                }
            });
        } else {
            users.sort((a, b) => {
                console.log(field)

                let valueA = a[field.trim()].toLowerCase();
                let valueB = b[field.trim()].toLowerCase();

                if (isFiltered) {
                    return valueA > valueB ? 1 : -1;
                } else {
                    return valueA < valueB ? 1 : -1;
                }
            });
        }
        setSortedField(field);
        setIsFiltered(val => !val);
    }
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <StyledTableRow>
                        <HeaderTitle handleSort={handleSort} sortedField={sortedField} isFiltered={isFiltered} />
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    <TableData rows={rows} handleClick={handleClick} />
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UserTable;







    // const sortedUsers = () => {
    //     toogle();

    // };

    // function sortedUsers() {
    //     users.sort((a, b) => {
    //         if (isFiltered) {
    //             return a.id - b.id;
    //         } else {
    //             return b.id - a.id;
    //         }
    //     });
    //     setIsFiltered(val => !val);
    // }