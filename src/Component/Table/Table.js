import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './styles.css'
import Button from '@mui/material/Button';
import CustomModal from '../Modal/CustomModal';
import { Container, Input } from '@mui/material';
import useBill from '../hooks/useBill';


export default function DenseTable() {
    const [open, setOpen] = useState(false);
    const [openToEdit, setOpenToEdit] = useState(false);
    const [billingId, setBillingId] = useState('')


    const handleOpen = () => {
        setOpen(true);
        setOpenToEdit(false)
    }
    const handleClose = () => setOpen(false);
    const { bills, setBills } = useBill();

    // deleting a billing info
    const handleDeleteBill = (id) => {
        const proceed = window.confirm('Are You Sure! Want to delete? ')
        if (proceed) {
            const url = `http://localhost:5000/delete-billing/${id}`;
            fetch(url, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        alert("Deleted Successfully!")
                        const remainingBillings = bills.filter(bill => bill._id !== id)
                        console.log(remainingBillings)
                        setBills(remainingBillings)
                    } else {
                        alert('someting wrong')
                    }
                })
        }
    }

    // editing or updating bill
    const handleEditBill = (id) => {
        setOpenToEdit(true)
        setOpen(true)
        setBillingId(id)
    }

    return (
        <>
            <Container>
                <div className='search'>
                    <Input
                        placeholder='Search bill'
                        className='search-input'
                    />
                    <Button onClick={handleOpen}>Add New Bill</Button>
                </div>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Billing ID</TableCell>
                                <TableCell align="right">Full Name</TableCell>
                                <TableCell align="right">Mobile Number</TableCell>
                                <TableCell align="right">Email Address</TableCell>
                                <TableCell align="right">Paid Amount</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bills?.map((bill) => (
                                <TableRow
                                    key={bill._id}
                                    className="table-row"
                                >
                                    <TableCell component="th" scope="row">
                                        {
                                            bill._id ?
                                                <>
                                                    {bill._id}
                                                </>
                                                :
                                                <>
                                                    Generating ID
                                                </>
                                        }
                                    </TableCell>
                                    <TableCell align="right">{bill.fullName}</TableCell>
                                    <TableCell align="right">{bill.phone}</TableCell>
                                    <TableCell align="right">{bill.email}</TableCell>
                                    <TableCell align="right">{bill.paidAmount}</TableCell>
                                    <TableCell align="right">
                                        <button
                                            onClick={() => { handleEditBill(bill._id) }}
                                            className='btn'>Edit</button>
                                        <button onClick={() => {
                                            handleDeleteBill(bill._id)
                                        }} className='btn'>delete</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>


            {/* modal componet  */}
            <CustomModal
                open={open}
                openToEdit={openToEdit}
                handleOpen={handleOpen}
                handleClose={handleClose}
                billingId={billingId}
            />
        </>
    );
}
