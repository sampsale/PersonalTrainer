import React from 'react';
import '../styles.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import EditCustomer from './EditCustomer';

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCustomer from './AddCustomer';
import Stack from '@mui/material/Stack';



export default function CustomerList() {

    const [customers, setCustomers] = React.useState();
    const [gridApi, setGridApi] = React.useState(null);
    React.useEffect(() => fetchCustomers(), [])

    // fetch customer data
    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then(content => content.json())
            .then(responseData => {
                setCustomers(responseData.content)
            })
            .catch(err => console.log(err));
    }

    // format name lastname + firstname
    function nameFormatter(params) {
        return params.data.lastname + ' ' + params.data.firstname
    }

    // post method
    const saveCustomer = (customer) => {
        console.log("POST" + customer)
        fetch("https://customerrest.herokuapp.com/api/customers", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(res => fetchCustomers())
            .catch(err => console.log(err))
    }

    // put method
    const editCustomer = (customer, link) => {
        console.log("PUT" + customer + link)
        fetch(link, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(res => fetchCustomers())
            .catch(err => console.log(err))
    }

    // delete method
    const deleteCustomer = (params) => {
        console.log("DELETE" + params)
        console.log(params.links[0].href)
        if (window.confirm("Are you sure you want to delete customer " + params.firstname + " " + params.lastname + "?")) {
            fetch(params.links[0].href, { method: "DELETE" })
                .then(res => fetchCustomers())
                .catch(err => (console.log(err)))
        }
    }

    //grid columns
    const columns = [
        { headerName: 'Name', field: 'lastname', headerClass: 'header', width: 150, valueFormatter: nameFormatter },
        { headerName: 'Address', headerClass: 'header', field: 'streetaddress' },
        { headerName: 'Postcode', headerClass: 'header', field: 'postcode', width: 200 },
        { headerName: 'City', headerClass: 'header', field: 'city', width: 120 },
        { headerName: 'Email', headerClass: 'header', field: 'email' },
        { headerName: 'Phone', headerClass: 'header', field: 'phone' },

        //edit button below
        {
            headerName: 'Edit', headerClass: 'header', sortable: false, filter: false, width: 100,
            cellRendererFramework: (params) => <div>
                <EditCustomer params={params.data} editCustomer={editCustomer} />
            </div>
        },
        //delete button below
        {
            headerName: 'Delete', headerClass: 'header', sortable: false, filter: false, width: 150, // size:'small',
            cellRendererFramework: (params) => <div>
                <IconButton variant="contained" color="error"
                    onClick={() => deleteCustomer(params.data)}
                > <DeleteIcon /></IconButton>
            </div>
        }
    ]
    //gridoptions ------ floatinfilter: true if you want a row filter
    const gridOptions = {
        sortable: true, filter: true, animateRows: true, resizable: true
    }
    // grid api options
    const onGridReady = (params) => {
        setGridApi(params.api);
        let gridApi = params.api
        window.onresize = () => {
            gridApi.sizeColumnsToFit();

        }
    };
    // scale grid
    // const sizeToFit = () => {
    //     gridApi.sizeColumnsToFit();
    //   };

    // scale on load 
    const onFirstDataRendered = () => {
        gridApi.sizeColumnsToFit();
    };
    return (
        <div>
            <div style={{ marginLeft: 50 }}>
                <Stack direction="row" spacing={3} justifyContent='flex-start'>
                    <AddCustomer saveCustomer={saveCustomer} />
                    {/* <Button variant="contained" size="small" onClick={()=>sizeToFit()} style={{ marginTop: 3}}>Scale grid</Button>    */}
                </Stack>
            </div>
            <div className="ag-theme-material" style={{ height: '700px', width: '95%', margin: 'auto' }}>
                <AgGridReact
                    columnDefs={columns}
                    defaultColDef={gridOptions}
                    rowData={customers}
                    onGridReady={onGridReady}
                    onFirstDataRendered={onFirstDataRendered}
                >
                </AgGridReact>
            </div>
        </div>
    )
}