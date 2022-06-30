import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '4px',
    boxShadow: 22,
    p: 4,
};



const CustomModal = ({ open, handleClose, openToEdit }) => {
    const [billingInfo, setBillingInfo] = useState({})
    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newBillingInfo = { ...billingInfo }
        newBillingInfo[field] = value;
        setBillingInfo(newBillingInfo)
    }

    // data entry 
    const handleBillSubmit = (e) => {
        e.preventDefault();
        // collect data
        const billingDoc = {
            ...billingInfo,
        }

        // send data to server
        if (!billingDoc.fullName) {
            alert('please insert your name')
            return
        } if (!billingDoc.email) {
            alert('please enter email')
            return
        } if (!billingDoc.phone) {
            alert('please enter phone number')
            return
        } if (billingDoc.phone.length !== 11) {
            alert('phone number must be in 11 digit')
            return
        } else {
            fetch('http://localhost:5000/add-billing', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(billingDoc)
            }).then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        handleClose()
                        alert('Successfully added new Product')
                        e.target.reset();
                    } else {
                        alert('something wrong')

                    }
                })
        }
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        {/* Add a New Bill */}
                    </Typography>
                    <form onSubmit={handleBillSubmit}>
                        <TextField
                            id="outlined-basic"
                            label="Your Name"
                            variant="outlined"
                            name="fullName"
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 1, mt: 1 }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Your Email"
                            variant="outlined"
                            name="email"
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 1, mt: 1 }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Your Phone Number"
                            variant="outlined"
                            name="phone"
                            maxLength={9}
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 1, mt: 1 }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Paid Amount"
                            variant="outlined"
                            name="paidAmount"
                            type="number"
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 1, mt: 1 }}
                        />
                        {
                            openToEdit ?
                                <Button variant="contained" type="submit">Edit</Button>
                                :
                                <Button variant="contained" type="submit">Book Now</Button>
                        }
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default CustomModal;