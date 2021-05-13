import { useState, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


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
    const [isFiltered, setIsFiltered] = useState(false)
    const cellName = ['Id', 'Name', 'User name', 'Email', 'Phone', 'Website']

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
    console.log(rows);

    
    const sortedUsers = () => {
        setIsFiltered(!false)
        return rows.sort((a, b) => {
            return b.id - a.id
        })
    }

    const tableTitle = cellName.map(item => <TableCell key={item} align="right" onClick={() => sortedUsers()}> {isFiltered ?  <ArrowDownwardIcon/> :  <ArrowUpwardIcon/>} </TableCell>)

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <StyledTableRow>
                        {tableTitle}
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.id} onClick={() => handleClick(row.id)}>
                            <TableCell align="right">{row.id}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.username}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                            <TableCell align="right">{row.website}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UserTable;