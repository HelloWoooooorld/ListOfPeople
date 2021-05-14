import TableCell from '@material-ui/core/TableCell';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    cell: {
        cursor: 'pointer',
    },
});

const HeaderTitle = ({ handleSort, isFiltered }) => {
    const classes = useStyles();
    const cellName = ['Id', 'Name', 'Username', 'Email', 'Phone', 'Website']

    return (
        cellName.map(item =>
            <TableCell
                className={classes.cell}
                key={item} 
                align="right"
                name={item}
                onClick={() => handleSort(item)}>
                {isFiltered ? <>{item} <ArrowUpwardIcon /> </>
                    : <>{item} <ArrowDownwardIcon /> </>}
            </TableCell>
        )
    )
}

export default HeaderTitle;