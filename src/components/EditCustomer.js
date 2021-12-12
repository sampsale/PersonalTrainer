import React from 'react';
import { Button, Dialog, TextField, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import '../styles.css';


export default function EditCustomer(props){
    const [open, setOpen] = React.useState(false)
    const [customer, setCustomer] = React.useState(
        { firstname:'', lastname:'',  streetaddress:'', postcode:'', city:'', email:'',  phone:''}
    )

    // when opened
    const handleClickOpen = () =>{
        console.log(props.params)
        setOpen(true)
        setCustomer({firstname: props.params.firstname, lastname: props.params.lastname, streetaddress: props.params.streetaddress, postcode: props.params.postcode, city:props.params.city, email:props.params.email, phone:props.params.phone})
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

    //put method
    const editCustomer = () =>{
        console.log("LINK " + props.params.links[0].href)
        props.editCustomer(customer, props.params.links[0].href)
        handleClose()
    }

    return (
        <div>
            <Button onClick={handleClickOpen} style={{maxWidth: '50px', fontSize: '18px', maxHeight: '30px', minWidth: '50px', minHeight: '30px'}} 
            variant="contained"
            >Edit</Button>
           
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit customer</DialogTitle>
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
                    <Button endIcon={<SendIcon />} onClick={editCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>


    )


}

