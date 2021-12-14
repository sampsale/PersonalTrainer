import React from 'react';
import { Button, Dialog, TextField, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import '../styles.css';

import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';


export default function AddTraining(props) {
    const [value, setValue] = React.useState(null);

    React.useEffect(() => fetchCustomers(), [])

    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then(content => content.json())
            .then(responseData => {
                setCustomers(responseData.content)
            })
            .catch(err => console.log(err));
    }


    const [open, setOpen] = React.useState(false)
    const [training, setTraining] = React.useState('')
    const [customers, setCustomers] = React.useState([])


    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleChange = (e) => {
        setTraining({ ...training, [e.target.name]: e.target.value })
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleCustomerChange = (e) => {
        console.log(e.target.value.links[0].href)
        setTraining({ ...training, customer: e.target.value.links[0].href })
        console.log(training)
    }
    const addTraining = () => {
        props.addTraining(training)
        setOpen(false)
    }
    const handleDateChange = (e) => {
        console.log(e._d)
        setTraining({ ...training, date: e._d })
        // setTraining({...training, date: e.target.value})
    }


    return (
        <div>
            <Button size="small" variant="contained" onClick={handleClickOpen}
                style={{ marginTop: 3 }}
            >Add a training</Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New training</DialogTitle>
                <DialogContent>
                    <InputLabel>Customer</InputLabel>
                    <Select
                        label='First name'
                        autoFocus
                        fullWidth
                        onChange={handleCustomerChange}
                        defaultValue=""
                    >
                        {customers.map((customer, index) => {
                            return (<MenuItem key={index} value={customer} >{customer.firstname}  {customer.lastname} </MenuItem>)
                        })}
                    </Select>
                    <TextField
                        margin='dense'
                        name='activity'
                        onChange={e => handleChange(e)}
                        label='Activity'
                        fullWidth
                        variant='standard'
                    />
                    {/* <TextField
                        label="Date"
                        name='date'
                        type="date"
                        sx={{ marginTop: 3 }}
                        onChange={e=> handleDateChange(e)}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    /> */}

                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateTimePicker
                            ampm={false}
                            renderInput={(props) => <TextField {...props} sx={{ marginTop: 3 }} name='date' fullWidth />}
                            label="Date"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue)
                                handleDateChange(newValue)
                                    ;
                            }}
                        />
                    </LocalizationProvider>
                    <TextField
                        margin='dense'
                        name='duration'
                        onChange={e => handleChange(e)}
                        label='Duration (min)'
                        fullWidth
                        variant='standard'
                    />
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button endIcon={<SendIcon />} onClick={addTraining}>Save</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>

    )
}