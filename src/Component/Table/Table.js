import * as React from 'react';
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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { bills } = useBill();
    console.log(bills)
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
                                        {bill._id}
                                    </TableCell>
                                    <TableCell align="right">{bill.fullName}</TableCell>
                                    <TableCell align="right">{bill.phone}</TableCell>
                                    <TableCell align="right">{bill.email}</TableCell>
                                    <TableCell align="right">{bill.paidAmount}</TableCell>
                                    <TableCell align="right">Action Btn here</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>


            {/* modal componet  */}
            <CustomModal
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
            />
        </>
    );
}
