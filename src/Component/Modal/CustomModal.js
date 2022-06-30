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



const CustomModal = ({ open, handleClose, handleOpen }) => {
    const [billingInfo, setBillingInfo] = useState({})

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newBillingInfo = { ...billingInfo }
        newBillingInfo[field] = value;
        setBillingInfo(newBillingInfo)
    }

    const handleBillSubmit = (e) => {
        e.preventDefault();
        // collect data
        const billingDoc = {
            ...billingInfo,
        }
        // send data to server
        fetch('https://desolate-thicket-66517.herokuapp.com/appointments', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(billingDoc)
        }).then(res => res.json())
            .then(data => {
                if (data.insertedId) {

                }
            })
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
                        Ts is me
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
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 1, mt: 1 }}
                        />
                        <Button variant="contained" type="submit">Book Now</Button>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default CustomModal;