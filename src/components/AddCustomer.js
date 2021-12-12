import React from 'react';
import { Button, Dialog, TextField, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import '../styles.css';


export default function AddCustomer(props){
    const [open, setOpen] = React.useState(false)
    const [customer, setCustomer] = React.useState(
        { firstname:'', lastname:'',  address:'', postcode:'', city:'', email:'',  phone:''}
    )

    // when opened
    const handleClickOpen = () =>{
        setOpen(true)
    }

    // handle input change, set new customer
    const handleChange = (e) =>{
        setCustomer({...customer, [e.target.name]: e.target.value})
        console.log(customer)
    }

    //when closed
    const handleClose = () =>{
        setOpen(false)
    }

    //post method
    const addCustomer = () =>{
        props.saveCustomer(customer)
        handleClose()
    }

    return (
        <div>
            <Button size="small" variant="contained"   onClick={handleClickOpen}
            style={{ marginTop: 3}}
           >Add new customer</Button>
           
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        name='firstname'
                        value={customer.firstname}
                        onChange={e=> handleChange(e)}
                        label='First name'
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        name='lastname'
                        value={customer.lastname}
                        onChange={e=> handleChange(e)}
                        label='Last name'
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        name='streetaddress'
                        value={customer.streetaddress}
                        onChange={e=> handleChange(e)}
                        label='Address'
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        name='postcode'
                        value={customer.postcode}
                        onChange={e=> handleChange(e)}
                        label='Postcode'
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        name='city'
                        value={customer.city}
                        onChange={e=> handleChange(e)}
                        label='City'
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        name='email'
                        value={customer.email}
                        onChange={e=> handleChange(e)}
                        label='Email'
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        name='phone'
                        value={customer.phone}
                        onChange={e=> handleChange(e)}
                        label='Phone'
                        fullWidth
                        variant='standard'
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button endIcon={<SendIcon />} onClick={addCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>


    )


}