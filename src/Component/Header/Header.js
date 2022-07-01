import { Container } from '@mui/system';
import React from 'react';
import useBill from '../hooks/useBill';
import './header.css'

const Header = () => {
    const { bills } = useBill();

    let sum = 0;
    const eachamount = bills?.map(bill => bill?.paidAmount)
    for (let i = 0; i < eachamount?.length; i++) {
        const amount = eachamount[i]
        sum = sum + parseInt(amount)
    }

    return (
        <Container>
            <div className='header'>
                <div>
                    <h3>Billing Dashboard</h3>
                </div>
                <div>
                    <h3>Total to Paid: {sum}</h3>
                </div>
            </div>
        </Container>
    );
};

export default Header;