import React from 'react';
import '../styles.css';
import {AgGridReact} from 'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';

import moment from 'moment';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import AddTraining from './AddTraining';
import { TrainingContext} from '../contexts/FetchTrainings'



export default function TrainingList(){

        
        const [trainings, setTrainings] = React.useState(React.useContext([TrainingContext]));
        const [gridApi, setGridApi] = React.useState(null);
        React.useEffect(() => fetchTrainings(), [])
         
        // fetch trainings
        const fetchTrainings= async ()=>{
            
            fetch("https://customerrest.herokuapp.com/gettrainings")
            .then(content => content.json())
            .then(responseData =>{
                setTrainings(responseData)
               
            })
            .catch(err=>console.log(err));
            // console.log(trainings[0].date)
            // console.log(trainings[0].duration)
        }

        //delete a training
        const deleteTraining = params =>{
            console.log(params.data.id)
            if (window.confirm("Are you sure you want to delete "+params.data.activity+" training with "+ params.data.customer.firstname+"?" )){
                fetch("https://customerrest.herokuapp.com/api/trainings/"+params.data.id, {method: 'DELETE'})
                .then(res => fetchTrainings())
                .catch(err=>console.log(err));
            }
        }

        // customer name formatter and getter
        const customerGetter = (params) =>{
            if (params.data.customer.firstname!== undefined &&params.data.customer.lastname!== undefined ){
                return params.data.customer.firstname + " " +params.data.customer.lastname
            } else {
                return 'test'
            }
            
        }

        //format date
        const dateFormatter = params =>{
            // console.log("DATEFORMATTER " + params.value)
            return moment(params.value).format('DD-MM-YYYY')
        }

        // post new training
        const addTraining = (training) => {
            console.log(training) 
            fetch("https://customerrest.herokuapp.com/api/trainings", {method:"POST",
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify(training)})
            .then(res=>fetchTrainings() )
            .catch(err=>console.log(err))
            
        }
    

        //format duration
        const durationFormatter = params =>{
            return params.value + " min"
        } 

        //grid columns
        const columns = [
            {headerName:'Date', headerClass:'header', field:'date', valueFormatter: dateFormatter, width: 120},
            {headerName:'Duration', headerClass:'header', field:'duration', valueFormatter: durationFormatter},
            {headerName:'Activity', headerClass:'header', field:'activity'},
            {headerName:'Customer', headerClass:'header', valueGetter: customerGetter},
            { sortable: false, filter: false,
            cellRendererFramework:(params)=><div>
                 <IconButton  variant="contained" color="error"
                 onClick={() => deleteTraining(params)}
                > <DeleteIcon /></IconButton>
                </div>
        }
        ]

        // floatinfilter: true if you want a row filter
        const gridOptions ={
            sortable: true, filter: true,  animateRows: true, resizable: true
            }
        // grid api options
        const onGridReady = (params) => {
            setGridApi(params.api);
            let gridApi = params.api
            window.onresize = () => {
                setTimeout(() => { gridApi.sizeColumnsToFit(); }, 500)
                
            }
            };
           // scale grid
        // const sizeToFit = () => {
        //      gridApi.sizeColumnsToFit();
        //     };
        
            // scale on load
        const onFirstDataRendered = () => {
                gridApi.sizeColumnsToFit();
              }

        return (
        <div>
        <div style={{marginLeft:50}}>
            <Stack direction="row" spacing={3} justifyContent='flex-start'>
                <AddTraining addTraining={addTraining}/>
                {/* <Button variant="contained" size="small" onClick={()=>sizeToFit()} style={{ marginTop: 3}}>Scale grid</Button>    */}
            </Stack>

        </div>
        <div className="ag-theme-material" style={{height:'700px',width:'95%',margin:'auto'}}>
            
            <AgGridReact
                columnDefs={columns}
                defaultColDef={gridOptions}
                rowData ={trainings}
                onGridReady={onGridReady}
                onFirstDataRendered = {onFirstDataRendered}
            >
    
    
            </AgGridReact>
        </div>
        </div>
    )
}