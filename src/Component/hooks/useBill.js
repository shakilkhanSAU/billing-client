import { useEffect, useState } from 'react';

const useBill = () => {
    const [bills, setBills] = useState()
    const url = "http://localhost:5000/billing-list"
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setBills(data)
            })
    }, []);
    return {
        bills
    }
}
export default useBill;