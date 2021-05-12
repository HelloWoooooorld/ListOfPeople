import { useEffect, useState } from "react";
import { DataGrid } from '@material-ui/data-grid';

const Home = () => {

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => setDatas(data))
            .catch((error) => console.log(error.message));
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'username', headerName: 'User name', width: 130 },
        {
            field: 'email',
            headerName: 'Emai',
            type: 'number',
            width: 90,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            type: 'number',
            width: 160,
        },
        {
            field: 'website',
            headerName: 'Website',
            width: 160,
        },
    ];

    return (
        <div style={{ height: 400, width: '100%', textAlign: 'center' }}>
            <DataGrid rows={datas} columns={columns} pageSize={5} />
        </div>
    );

}

export default Home;

